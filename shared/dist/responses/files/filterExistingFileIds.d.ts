import { z } from "zod";
export declare const FilterExistingFileIdsResponseSchema: z.ZodObject<{
    filteredIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    filteredIds: string[];
}, {
    filteredIds: string[];
}>;
export type FilterExistingFileIdsResponse = z.infer<typeof FilterExistingFileIdsResponseSchema>;
