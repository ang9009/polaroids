/*
  Warnings:

  - You are about to drop the column `addedAt` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_albumName_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "addedAt",
ADD COLUMN     "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SubscribedChannel" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Media";

-- CreateTable
CREATE TABLE "File" (
    "fileId" VARCHAR(255) NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumName" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("fileId")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("name") ON DELETE CASCADE ON UPDATE CASCADE;
