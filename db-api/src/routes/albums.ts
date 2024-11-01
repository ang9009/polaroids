import express, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import HttpStatusCode from "../data/statusCodes";
import {
  CreateAlbumQueryParams,
  CreateAlbumQueryParamsSchema,
} from "../types/createAlbumQueryParams";
import { HttpException } from "../types/apiError";

const router = express.Router();

// Look up DTO

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
    const albumData = req.body;

    // TODO: make a type for the json return
    res.status(HttpStatusCode.OK).json({ msg: "Success" });
  }
);

export default router;
