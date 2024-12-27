import { File } from "backend/generated/zod/index";
type FileWithBlob = File & {
  blob: Blob;
};

export type FileData = Omit<FileWithBlob, "albumName">;
