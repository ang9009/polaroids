import { z } from "zod";
export declare const UploadFilesResponseSchema: z.ZodObject<{
    filesUploaded: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    filesUploaded: number;
}, {
    filesUploaded: number;
}>;
export type UploadFilesResponse = z.infer<typeof UploadFilesResponseSchema>;
