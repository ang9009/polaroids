import { z } from "zod";
import { mimeToExtension } from "../../helpers/getExtensionFromMimeType";

export const DownloadFileRequestSchema = z.object({
  discordId: z.string(),
  extension: z.string().refine((extension) => Object.values(mimeToExtension).includes(extension)),
});

export type DownloadFileRequest = z.infer<typeof DownloadFileRequestSchema>;
