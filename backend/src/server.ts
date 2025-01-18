import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";
import express, { Router } from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import DiscordStrategy from "passport-discord";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { discordScopes } from "./data/discordScopes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";
import albums from "./routes/albums.routes";
import auth from "./routes/auth.routes";
import files from "./routes/files.routes";
import guilds from "./routes/guilds.routes";
import subscribedChannels from "./routes/subbedChannels.routes";
import { FileStationCredentials } from "./services/filestation/fileStationCredentials";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.WEBSITE_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Express session and passport middleware
const sessionStore = new PrismaSessionStore(new PrismaClient(), {
  checkPeriod: 2 * 60 * 1000,
  dbRecordIdIsSessionId: true,
});
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport strategies
const discordStrategy = new DiscordStrategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    callbackURL: `${process.env.API_DOMAIN}:${process.env.PORT}/api/auth/discord/callback`,
    scope: discordScopes,
  },
  function (accessToken, refreshToken, profile, cb) {
    process.nextTick(() => cb(null, profile));
  }
);
const apiKeyStrategy = new HeaderAPIKeyStrategy(
  { header: "Authorization", prefix: "Api-Key " },
  false,
  (apiKey, done) => {
    // Probably not the best way to do it, but this only has one client (the bot) so this is
    // fine for now
    if (apiKey === process.env.BOT_API_KEY) {
      return done(null, {});
    }
    done(null, false);
  }
);
passport.use(discordStrategy);
passport.use(apiKeyStrategy);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj: Express.User, done) {
  done(null, obj);
});

// Routes
const protectedRoutes = Router();
protectedRoutes.use("/albums", albums);
protectedRoutes.use("/guilds", guilds);
protectedRoutes.use("/subscribed-channels", subscribedChannels);
protectedRoutes.use("/files", files);

const unprotectedRoutes = Router();
unprotectedRoutes.use("/auth", auth);

app.use("/api", unprotectedRoutes);
// ! Add checkAuth back as middleware later
app.use("/api", protectedRoutes);

app.use(errorHandler);
app.use(notFound);

await FileStationCredentials.getInstance();
app.listen(port, () => console.log(`Server running on port ${port}`));
