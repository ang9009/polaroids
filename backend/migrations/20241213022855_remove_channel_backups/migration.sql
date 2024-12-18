/*
  Warnings:

  - You are about to drop the `ChannelBackups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelBackups" DROP CONSTRAINT "ChannelBackups_albumName_fkey";

-- DropTable
DROP TABLE "ChannelBackups";
