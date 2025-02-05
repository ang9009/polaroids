import { z } from "zod";

export const CreateFolderRequestSchema = z
  .object({
    albumId: z.string().optional(),
    parentFolderId: z.string().optional(),
    folderName: z.string(),
  })
  // Mutually exclusive: one must be non-null
  .refine((req) => !!req.albumId !== !!req.parentFolderId, {
    message:
      "Either albumId or parentFolderId must be non-null. " +
      "Both cannot be non-null/null at the same time.",
  });
