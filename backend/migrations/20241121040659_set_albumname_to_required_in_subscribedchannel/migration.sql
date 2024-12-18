/*
  Warnings:

  - Made the column `albumName` on table `SubscribedChannel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SubscribedChannel" DROP CONSTRAINT "SubscribedChannel_albumName_fkey";

-- AlterTable
ALTER TABLE "SubscribedChannel" ALTER COLUMN "albumName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("albumName") ON DELETE CASCADE ON UPDATE CASCADE;
