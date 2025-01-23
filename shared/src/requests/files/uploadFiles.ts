import { z } from "zod";
import { stringToJSON } from "../../schemas/stringToJSON";

export const FilesUploadDataSchema = z.record(
  z.string(),
  z.object({
    fileName: z.string(),
    fileExtension: z.string(),
    uploaderId: z.string(),
    fileLink: z.string().optional(),
    createdAt: z
      .string()
      .transform((dateString) => new Date(dateString))
      .pipe(z.date()),
  })
);
export type FilesUploadData = z.infer<typeof FilesUploadDataSchema>;

const stringToJSONSchema = stringToJSON();

export const UploadFilesRequestBodySchema = z.object({
  throwUniqueConstraintError: z.preprocess((val) => val === "true", z.boolean()).default(false),
  albumId: z.string(),
  filesData: z
    .string()
    .transform((json) => {
      return stringToJSONSchema.parse(json);
    })
    .pipe(FilesUploadDataSchema),
});
