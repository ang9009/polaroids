import { z } from "zod";
import zu from "zod_utilz";

export const FilesDataSchema = z.record(
  z.string(),
  z.object({
    fileName: z.string(),
    uploaderId: z.string(),
    createdAt: z
      .string()
      .transform((dateString) => new Date(dateString))
      .pipe(z.date()),
  })
);

const stringToJSONSchema = zu.stringToJSON();

export const UploadFilesRequestBodySchema = z.object({
  throwUniqueConstraintError: z.preprocess((val) => val === "true", z.boolean()).default(false),
  albumId: z.string(),
  filesData: z
    .string()
    .transform((json) => {
      return stringToJSONSchema.parse(json);
    })
    .pipe(FilesDataSchema),
});

export type FilesUploadData = z.infer<typeof FilesDataSchema>;
