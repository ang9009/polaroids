/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumName_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Media" (
    "mediaId" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "albumName" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("mediaId")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("name") ON DELETE CASCADE ON UPDATE CASCADE;
