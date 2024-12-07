import { NextFunction, Request, Response } from "express";
/**
 * Adds a guild to the Postgres database.
 * Route: POST /api/guilds
 */
export declare const addGuild: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Deletes a guild from the Postgres database.
 * Route: DELETE /api/guilds/:guildId
 * @param req request object
 * @param res result object
 * @param next next function
 * @returns void
 */
export declare const deleteGuild: (req: Request, res: Response, next: NextFunction) => Promise<void>;
