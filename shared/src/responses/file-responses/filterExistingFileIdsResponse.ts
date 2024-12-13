import { z } from "zod";

export const FilterExistingFileIdsResponseSchema = z.object({
  filteredIds: z.array(z.string()),
});

export type FilterExistingFileIdsResponse = z.infer<typeof FilterExistingFileIdsResponseSchema>;
