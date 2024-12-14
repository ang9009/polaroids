import { File } from "./../../../../../db-api/generated/zod/index";
type FileWithBlob = File & {
  blob: Blob;
};

export type FileData = Omit<FileWithBlob, "albumName">;
