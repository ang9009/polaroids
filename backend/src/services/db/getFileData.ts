import { GetFilesCursor } from "shared/src/requests/files/cursor";
import { prisma } from "../../lib/prisma";

/**
 * Retrieves paginated file data based on the given parameters.
 * @param pageSize the number of files to be retrieved
 * @param cursor the cursor object used for pagination, which contains the
 * discord id and created at of the file the cursor is currently pointing to
 * @param searchQuery an optional search query
 * @param albumId the id of the album the files should be in
 * @returns the related file data
 */
export const getFileData = async (
  pageSize: number,
  cursor?: GetFilesCursor,
  searchQuery?: string,
  albumId?: string
) => {
  return await prisma.mediaFile.findMany({
    take: pageSize,
    ...(cursor && {
      skip: 1,
      cursor: {
        discordId: cursor.discordId,
        createdAt: cursor.createdAt,
      },
    }),
    where: {
      ...(searchQuery && {
        fileName: {
          contains: searchQuery.trim(),
          mode: "insensitive",
        },
      }),
      ...(albumId && { albumId: albumId }),
    },
    select: {
      discordId: true,
      fileName: true,
      extension: true,
      createdAt: true,
    },
    orderBy: [{ createdAt: "desc" }, { discordId: "asc" }],
  });
};
