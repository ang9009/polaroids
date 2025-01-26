import { z } from "zod";
import { AllowedMimeType } from "../../data/allowedMimeType";

export const GetFileLinkRequestSchema = z.object({
  // The discord attachment of the original file
  discordId: z.string(),
  // The mimetype of the original file
  mimetype: z.nativeEnum(AllowedMimeType),
  // Whether the file's thumbnail is being requested, or the file itself. Leave
  // undefined if the file is desired
  thumbnail: z.string().transform((bool) => Boolean(bool)),
});

export type GetFileLinkRequest = z.infer<typeof GetFileLinkRequestSchema>;
