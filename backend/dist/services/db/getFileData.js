import prisma from "../../lib/prisma";
/**
 * Retrieves paginated file data based on the given parameters.
 * @param cursor the cursor object used for pagination, which contains the
 * discord id and created at of the file the cursor is currently pointing to
 * @param pageSize the number of files to be retrieved
 * @param searchQuery an optional search query
 * @returns the related file data
 */
export const getFileData = async ({ cursor, pageSize, searchQuery }) => {
    return await prisma.mediaFile.findMany(Object.assign(Object.assign(Object.assign({ take: pageSize }, (cursor && {
        skip: 1,
        cursor: {
            discordId: cursor.discordId,
            createdAt: cursor.createdAt,
        },
    })), (searchQuery && {
        where: {
            fileName: {
                contains: searchQuery.trim(),
                mode: "insensitive",
            },
        },
    })), { select: {
            discordId: true,
            fileName: true,
            extension: true,
        }, orderBy: [{ createdAt: "desc" }, { discordId: "asc" }] }));
};
