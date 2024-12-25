-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "albumId" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Album_pkey" PRIMARY KEY ("albumId");
