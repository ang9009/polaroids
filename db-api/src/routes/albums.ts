import express from "express";
import { albumExists, getAlbums } from "../controllers/albumController";

const router = express.Router();

// Get all existing albums
router.get("/", getAlbums);

// Check if an album exists
router.get("/album-exists/:albumName", albumExists);

// Create an album
// router.post("/", async (req: Request, res: Response, next: NextFunction) => {
//   const parseRes = CreateAlbumQueryParamsSchema.safeParse(req.body);
//   if (!parseRes.success) {
//     const error = new ValidationException(parseRes.error);
//     return next(error);
//   }
//   const { albumName } = parseRes.data;

//   try {
//     // Create transaction and throw an error if something happens with FileStation
//     // await prisma.$transaction(async (tx) => {
//     //   await tx.album.create({
//     //     data: {
//     //       albumName: albumName,
//     //     },
//     //   });
//     // });
//   } catch (error) {
//     if (error instanceof Error) {
//       return next(error);
//     } else {
//       const dbError = getDbExFromPrismaErr(error);
//       return next(dbError);
//     }
//   }

//   res.status(HttpStatusCode.OK).json(successJson);
// });

export default router;
