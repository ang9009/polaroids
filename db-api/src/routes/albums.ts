import express, { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/statusCodes";
import {
  CreateAlbumQueryParams,
  CreateAlbumQueryParamsSchema,
} from "../types/request/createAlbumQueryParams";

const router = express.Router();

// Create an album
router.post(
  "/",
  (req: Request<{}, {}, CreateAlbumQueryParams>, res: Response, next: NextFunction) => {
    const parseRes = CreateAlbumQueryParamsSchema.safeParse(req.body);
    // !Figure out how to get the erorr message
    //! Finish guidls first
    if (!parseRes.success) {
      // const error = new HttpException(HttpStatusCode.BAD_REQUEST);
      // return next(error);
    }
    const { albumId, albumName } = req.body;
    // prisma.guild.create

    res.status(HttpStatusCode.OK).json({ msg: "Success" });
  }
);

export default router;
