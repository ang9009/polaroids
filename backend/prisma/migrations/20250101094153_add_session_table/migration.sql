-- CreateTable
CREATE TABLE "Guild" (
    "guildId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "Album" (
    "albumId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "albumName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("albumId")
);

-- CreateTable
CREATE TABLE "SubscribedChannel" (
    "channelId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guildId" TEXT NOT NULL,
    "albumId" UUID NOT NULL,

    CONSTRAINT "SubscribedChannel_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "File" (
    "discordId" VARCHAR(255) NOT NULL,
    "uploaderId" VARCHAR(255) NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumId" UUID NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("discordId")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_albumName_key" ON "Album"("albumName");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE CASCADE ON UPDATE CASCADE;
