/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumName_fkey";

-- DropForeignKey
ALTER TABLE "SubscribedChannel" DROP CONSTRAINT "SubscribedChannel_albumName_fkey";

-- DropForeignKey
ALTER TABLE "SubscribedChannel" DROP CONSTRAINT "SubscribedChannel_guildId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "SubscribedChannel" ALTER COLUMN "albumName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("albumName") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("albumName") ON DELETE CASCADE ON UPDATE CASCADE;
