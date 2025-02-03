-- CreateTable
CREATE TABLE "Folder" (
    "folderId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "folderName" VARCHAR(255) NOT NULL,
    "albumId" UUID,
    "parentFolderId" UUID,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("folderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_folderName_key" ON "Folder"("folderName");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folder"("folderId") ON DELETE CASCADE ON UPDATE CASCADE;
