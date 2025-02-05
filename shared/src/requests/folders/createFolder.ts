import { z } from "zod";
import { refineFoldersReferenceSchema } from "./foldersReference";

const schema = z.object({
  folderName: z.string(),
});

// !Figure this out
export const CreateFolderRequestSchema = refineFoldersReferenceSchema(schema);
