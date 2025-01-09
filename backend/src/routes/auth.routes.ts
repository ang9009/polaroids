import express from "express";
import passport from "passport";
import { getInfo } from "../controllers/auth.controller";
import { discordScopes } from "../data/discordScopes";
import { checkAuth } from "../middleware/checkAuth";

const router = express.Router();

// ! Should probably remove all the /discord references and add another router here
router.get(
  "/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/api/auth/discord/login?error=auth_failed",
    successRedirect: "/api/auth/discord/info",
  })
);

router.get(
  "/discord/login",
  passport.authenticate("discord", { scope: discordScopes, prompt: "Please login" })
);

router.get("/discord/info", checkAuth, getInfo);

// ! Need logout route. Look at the example

export default router;
