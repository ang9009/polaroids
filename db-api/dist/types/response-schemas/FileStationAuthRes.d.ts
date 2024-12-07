import { z } from "zod";
export declare const FileStationAuthDataSchema: z.ZodObject<{
    sid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sid: string;
}, {
    sid: string;
}>;
export type FileStationAuthData = z.infer<typeof FileStationAuthDataSchema>;
