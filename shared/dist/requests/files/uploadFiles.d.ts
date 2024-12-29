import { z } from "zod";
export declare const FilesDataSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    fileName: z.ZodString;
    uploaderId: z.ZodString;
    createdAt: z.ZodPipeline<z.ZodEffects<z.ZodString, Date, string>, z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    fileName: string;
    uploaderId: string;
    createdAt: Date;
}, {
    fileName: string;
    uploaderId: string;
    createdAt: string;
}>>;
export declare const UploadFilesRequestBodySchema: z.ZodObject<{
    throwUniqueConstraintError: z.ZodDefault<z.ZodEffects<z.ZodBoolean, boolean, unknown>>;
    albumId: z.ZodString;
    filesData: z.ZodPipeline<z.ZodEffects<z.ZodString, string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | {
        [key: string]: any;
    } | (string | number | boolean | any[] | {
        [key: string]: any;
    } | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null, string>, z.ZodRecord<z.ZodString, z.ZodObject<{
        fileName: z.ZodString;
        uploaderId: z.ZodString;
        createdAt: z.ZodPipeline<z.ZodEffects<z.ZodString, Date, string>, z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        fileName: string;
        uploaderId: string;
        createdAt: Date;
    }, {
        fileName: string;
        uploaderId: string;
        createdAt: string;
    }>>>;
}, "strip", z.ZodTypeAny, {
    albumId: string;
    throwUniqueConstraintError: boolean;
    filesData: Record<string, {
        fileName: string;
        uploaderId: string;
        createdAt: Date;
    }>;
}, {
    albumId: string;
    filesData: string;
    throwUniqueConstraintError?: unknown;
}>;
export type FilesUploadData = z.infer<typeof FilesDataSchema>;
