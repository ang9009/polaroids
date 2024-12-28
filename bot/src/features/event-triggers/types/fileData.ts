import { File } from "backend/prisma/generated/zod/index";
type FileWithBlob = File & {
  blob: Blob;
};

export type FileData = Omit<FileWithBlob, "albumId">;
