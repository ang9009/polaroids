import { MediaFile } from "backend/prisma/generated/zod/index";
type MediaFileWithBlob = MediaFile & {
  blob: Blob;
  link: string;
};

export type MediaFileData = Omit<MediaFileWithBlob, "albumId">;
