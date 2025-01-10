import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import dotenv from "dotenv";
import "dotenv/config";
import express, { Router } from "express";
import session from "express-session";
import passport from "passport";
import DiscordStrategy from "passport-discord";
import { discordScopes } from "./data/discordScopes";
import { checkAuth } from "./middleware/checkAuth";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";
import albums from "./routes/albums.routes";
import auth from "./routes/auth.routes";
import files from "./routes/files.routes";
import guilds from "./routes/guilds.routes";
import subscribedChannels from "./routes/subbedChannels.routes";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

// Passport js setup
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
passport.use(discordStrategy);
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
app.use("/api", checkAuth, protectedRoutes);

// Error handlers
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => console.log(`Server running on port ${port}`));
