import { z } from "zod";
import { AllowedMimeType } from "../../data/allowedMimeType";
export declare const DownloadFileRequestSchema: z.ZodObject<{
    discordId: z.ZodString;
    mimetype: z.ZodNativeEnum<typeof AllowedMimeType>;
    thumbnail: z.ZodEffects<z.ZodString, boolean, string>;
}, "strip", z.ZodTypeAny, {
    discordId: string;
    mimetype: AllowedMimeType;
    thumbnail: boolean;
}, {
    discordId: string;
    mimetype: AllowedMimeType;
    thumbnail: string;
}>;
export type DownloadFileRequest = z.infer<typeof DownloadFileRequestSchema>;
