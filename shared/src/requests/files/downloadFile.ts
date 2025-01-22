import { z } from "zod";
import { mimetypeToExtension } from "../../data/mimetypeToExtension";

export const DownloadFileRequestSchema = z.object({
  discordId: z.string(),
  extension: z
    .string()
    .refine((extension) => Object.values(mimetypeToExtension).includes(extension)),
});

export type DownloadFileRequest = z.infer<typeof DownloadFileRequestSchema>;
