-- CreateTable
CREATE TABLE "Guild" (
    "guildId" VARCHAR(255) NOT NULL,
    "addedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "Album" (
    "albumId" VARCHAR(255) NOT NULL,
    "albumName" VARCHAR(255) NOT NULL,
    "deletedAt" TIMESTAMP,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "SubscribedChannel" (
    "channelId" VARCHAR(255) NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "SubscribedChannel_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "Image" (
    "imageId" VARCHAR(255) NOT NULL,
    "deletedAt" TIMESTAMP,
    "description" VARCHAR(255),
    "albumId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("imageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_albumId_key" ON "Album"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "Album_albumName_key" ON "Album"("albumName");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribedChannel" ADD CONSTRAINT "SubscribedChannel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE RESTRICT ON UPDATE CASCADE;
