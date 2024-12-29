import { z } from "zod";
export const FilterExistingFileIdsResponseSchema = z.object({
    filteredIds: z.array(z.string()),
});
//# sourceMappingURL=filterExistingFileIds.js.map