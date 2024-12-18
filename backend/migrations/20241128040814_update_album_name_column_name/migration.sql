/*
  Warnings:

  - You are about to drop the column `albumName` on the `Album` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumName_fkey";

-- DropForeignKey
ALTER TABLE "SubscribedChannel" DROP CONSTRAINT "SubscribedChannel_albumName_fkey";

-- DropIndex
DROP INDEX "Album_albumName_key";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "albumName",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Album_name_key" ON "Album"("name");

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("name") ON DELETE CASCADE ON UPDATE CASCADE;
