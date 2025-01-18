/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_albumId_fkey";

-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "MediaFile" (
    "discordId" VARCHAR(255) NOT NULL,
    "uploaderId" VARCHAR(255) NOT NULL,
    "extension" VARCHAR(255) NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumId" UUID NOT NULL,

    CONSTRAINT "MediaFile_pkey" PRIMARY KEY ("discordId")
);

-- AddForeignKey
ALTER TABLE "MediaFile" ADD CONSTRAINT "MediaFile_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE CASCADE ON UPDATE CASCADE;
