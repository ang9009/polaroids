import { MediaFile } from "backend/prisma/generated/zod/index";
type MediaFileWithBlob = MediaFile & {
  blob: Blob;
};

export type MediaFileData = Omit<MediaFileWithBlob, "albumId">;
