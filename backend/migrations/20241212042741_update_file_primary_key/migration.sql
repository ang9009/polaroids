/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fileId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the `ChannelBackupLog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `messageId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChannelBackupLog" DROP CONSTRAINT "ChannelBackupLog_albumName_fkey";

-- DropForeignKey
ALTER TABLE "ChannelBackupLog" DROP CONSTRAINT "ChannelBackupLog_channelId_fkey";

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "fileId",
ADD COLUMN     "messageId" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("messageId", "fileName");

-- DropTable
DROP TABLE "ChannelBackupLog";
