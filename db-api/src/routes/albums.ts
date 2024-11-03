import express, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import HttpStatusCode from "../data/statusCodes";
import { HttpException } from "../types/error/apiError";
import {
  CreateAlbumQueryParams,
  CreateAlbumQueryParamsSchema,
} from "../types/request/createAlbumQueryParams";

const router = express.Router();

// Create an album
router.post(
  "/",
  (req: Request<{}, {}, CreateAlbumQueryParams>, res: Response, next: NextFunction) => {
    try {
      CreateAlbumQueryParamsSchema.parse(req.body);
    } catch (err) {
      if (err instanceof ZodError) {
        const error = new HttpException(HttpStatusCode.BAD_REQUEST, JSON.stringify(err.issues));
        return next(error);
      }
    }
    const { albumId, albumName } = req.body;
    // prisma.guild.create

    res.status(HttpStatusCode.OK).json({ msg: "Success" });
  }
);

export default router;
