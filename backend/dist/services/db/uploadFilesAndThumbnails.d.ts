import { MediaFile } from "@prisma/client";
import { BufferFile } from "../../types/data/bufferFile";
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
export declare const uploadFilesAndThumbnails: (thumbnailFiles: BufferFile[], mediaFiles: BufferFile[], dbFileObjects: MediaFile[], throwUniqueConstraintError: boolean) => Promise<number>;
