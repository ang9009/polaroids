import express from "express";
import passport from "passport";
import { discordLogout, getInfo } from "../controllers/auth.controller";
import { discordScopes } from "../data/discordScopes";
import { checkAuth } from "../middleware/checkAuth";

const router = express.Router();

// Discord authentication routes
const discordRouter = express.Router();

// Callback route used as the OAuth redirect URI
discordRouter.get(
  "/callback",
  passport.authenticate("discord", {
    // ! This should redirect to the frontend.
    failureRedirect: "/api/auth/discord/login?error=auth_failed",
    successRedirect: "/api/auth/discord/info",
  })
);

// Used to login via Discord OAuth 2.0
discordRouter.get("/login", passport.authenticate("discord", { scope: discordScopes }));

// Logs the user out if they were previously logged in with Discord
discordRouter.get("/logout", checkAuth, discordLogout);

// Gets information about the currently logged in user (logged in via Discord)
discordRouter.get("/info", checkAuth, getInfo);

router.use("/discord", discordRouter);

export default router;
