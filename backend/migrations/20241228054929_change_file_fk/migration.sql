/*
  Warnings:

  - You are about to drop the column `name` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `albumName` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `albumName` on the `SubscribedChannel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[albumName]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `albumName` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumId` to the `SubscribedChannel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_albumName_fkey";

-- DropForeignKey
ALTER TABLE "SubscribedChannel" DROP CONSTRAINT "SubscribedChannel_albumName_fkey";

-- DropIndex
DROP INDEX "Album_name_key";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "name",
ADD COLUMN     "albumName" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "albumName",
ADD COLUMN     "albumId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "SubscribedChannel" DROP COLUMN "albumName",
ADD COLUMN     "albumId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Album_albumName_key" ON "Album"("albumName");

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE CASCADE ON UPDATE CASCADE;
