/*
  Warnings:

  - You are about to drop the `ChannelBackups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelBackups" DROP CONSTRAINT "ChannelBackups_albumName_fkey";

-- DropTable
DROP TABLE "ChannelBackups";

-- CreateTable
CREATE TABLE "ChannelBackupLog" (
    "lastBackedUpMessageId" VARCHAR(255) NOT NULL,
    "channelId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumName" TEXT NOT NULL,

    CONSTRAINT "ChannelBackupLog_pkey" PRIMARY KEY ("lastBackedUpMessageId")
);

-- AddForeignKey
ALTER TABLE "ChannelBackupLog" ADD CONSTRAINT "ChannelBackupLog_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
