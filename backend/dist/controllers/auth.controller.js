import { GetUserInfoResponseSchema } from "shared/src/responses/auth/getInfo";
import HttpStatusCode from "../data/httpStatusCode";
/**
 * Returns information regarding the user who is currently logged in. This
 * assumes that there is a logged in user.
 * Route: GET /api/auth/discord/info
 */
export const getInfo = (req, res, next) => {
    const parsedUser = GetUserInfoResponseSchema.parse(req.user);
    res.status(HttpStatusCode.OK).json(parsedUser);
};
/**
 * Logs out the currently logged in user.
 * Route: POST /api/auth/discord/logout
 */
export const discordLogout = (req, res, next) => {
    req.logout(() => {
        res.status(HttpStatusCode.OK).json({ message: "Successfully logged out" });
    });
};
