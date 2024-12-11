// Taken from https://github.com/JacobWeisenburger/zod_utilz/tree/4093595e5a6d95770872598ba3bc405d4e9c963b
import { z } from "zod";
import zu from "zod_utilz";

export const FilesDataSchema = z.record(
  z.string(),
  z.object({
    fileName: z.string(),
    createdAt: z
      .string()
      .transform((dateString) => new Date(dateString))
      .pipe(z.date()),
  })
);

const stringToJSONSchema = zu.stringToJSON();

export const UploadFilesReqBodySchema = z.object({
  albumName: z.string(),
  filesData: z
    .string()
    .transform((json) => stringToJSONSchema.parse(json))
    .pipe(FilesDataSchema),
});

export type FilesUploadData = z.infer<typeof FilesDataSchema>;
