import { z } from "zod";
export const FilterExistingFileIdsRequestSchema = z.object({
    fileIds: z.string().transform((stringList) => stringList.split(",")),
});
//# sourceMappingURL=filterExistingFileIds.js.map