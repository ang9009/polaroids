/*
  Warnings:

  - You are about to drop the column `albumId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `Image` table. All the data in the column will be lost.
  - Added the required column `albumName` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumName` to the `SubscribedChannel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumId_fkey";

-- DropIndex
DROP INDEX "Album_albumId_key";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "albumId";

-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "albumId";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "albumId",
ADD COLUMN     "albumName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscribedChannel" ADD COLUMN     "albumName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("albumName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("albumName") ON DELETE RESTRICT ON UPDATE CASCADE;
