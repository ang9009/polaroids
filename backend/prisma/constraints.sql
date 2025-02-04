-- Adds a constraint to the Folder table to make sure that either parentFolderId
-- or albumId is non-null
ALTER TABLE Folder
ADD CONSTRAINT Folder_ParentFolderOrAlbumExists
CHECK ((parentFolderId IS NULL AND albumId IS NOT NULL) 
      OR (parentFolderId IS NOT NULL AND albumId IS NULL))