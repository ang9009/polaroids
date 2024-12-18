-- CreateTable
CREATE TABLE "ChannelBackups" (
    "lastBackedUpMessageId" VARCHAR(255) NOT NULL,
    "channelId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumName" TEXT NOT NULL,

    CONSTRAINT "ChannelBackups_pkey" PRIMARY KEY ("lastBackedUpMessageId")
);

-- AddForeignKey
ALTER TABLE "ChannelBackups" ADD CONSTRAINT "ChannelBackups_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
