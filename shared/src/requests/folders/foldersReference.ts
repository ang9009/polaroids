import { z, ZodRawShape } from "zod";

/**
 * Folders are referenced by either their parent folder, or the id of the album
 * they are in.
 */
const FoldersReferenceSchema = z.object({
  albumId: z.string().optional(),
  parentFolderId: z.string().optional(),
}); // Mutually exclusive: one must be non-null

/**
 * Extends the FoldersReferenceSchema with the given schema, and adds a
 * restriction that either albumId or parentFolderId must be non-null.
 * @param schema the schema to be extended from
 */
export const refineFoldersReferenceSchema = (schema: ZodRawShape) => {
  FoldersReferenceSchema.extend(schema).refine((req) => !!req.albumId !== !!req.parentFolderId, {
    message:
      "Either albumId or parentFolderId must be non-null. " +
      "Both cannot be non-null/null at the same time.",
  });
};
