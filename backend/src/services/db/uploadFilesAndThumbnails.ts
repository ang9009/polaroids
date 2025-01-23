import { MediaFile } from "@prisma/client";
import prisma from "../../lib/prisma";
import { BufferFile } from "../../types/data/bufferFile";
import { FileStation } from "../filestation/fileStation";

/**
 * Uploads the given thumbnails and media files to FileStation, and updates the
 * database with their records.
 * @param thumbnailFiles thumbnails for each image/video
 * @param mediaFiles the image/video files
 * @param dbFileObjects the database objects/records for each file
 * @param throwUniqueConstraintError whether a unique constraint error should be
 * thrown for duplicate files
 * @returns the number of files uploaded
 */
export const uploadFilesAndThumbnails = async (
  thumbnailFiles: BufferFile[],
  mediaFiles: BufferFile[],
  dbFileObjects: MediaFile[],
  throwUniqueConstraintError: boolean
): Promise<number> => {
  let filesUploaded: number = 0;

  await prisma.$transaction(
    async (tx) => {
      const { count } = await tx.mediaFile.createMany({
        data: dbFileObjects,
        skipDuplicates: !throwUniqueConstraintError,
      });
      filesUploaded = count;

      await FileStation.uploadFilesToFS(thumbnailFiles, "/polaroids/thumbnails");
      await FileStation.uploadFilesToFS(mediaFiles, "/polaroids/media");
    },
    {
      timeout: 600_000, // 10 minutes YOLO
    }
  );

  return filesUploaded;
};
