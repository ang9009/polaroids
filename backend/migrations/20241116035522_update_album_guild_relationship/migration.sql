/*
  Warnings:

  - The primary key for the `Album` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guildId` on the `Album` table. All the data in the column will be lost.
  - Added the required column `albumId` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_guildId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP CONSTRAINT "Album_pkey",
DROP COLUMN "guildId";

-- AlterTable
ALTER TABLE "Guild" ADD COLUMN     "albumId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Guild" ADD CONSTRAINT "Guild_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE RESTRICT ON UPDATE CASCADE;
