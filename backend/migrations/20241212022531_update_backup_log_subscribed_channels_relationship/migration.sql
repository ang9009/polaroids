/*
  Warnings:

  - A unique constraint covering the columns `[channelId]` on the table `ChannelBackupLog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChannelBackupLog_channelId_key" ON "ChannelBackupLog"("channelId");

-- AddForeignKey
ALTER TABLE "ChannelBackupLog" ADD CONSTRAINT "ChannelBackupLog_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "SubscribedChannel"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;
