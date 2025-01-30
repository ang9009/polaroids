import { useQuery } from "@tanstack/react-query";
import { AllowedMimeType } from "shared/src/data/allowedMimeType";
import { getAlbumsData } from "../services/getAlbums";
import { getFileUrl } from "../services/getFile";

/**
 * Retrieves all albums and their corresponding thumbnail urls.
 * @returns {Promise<AlbumInfo[]>} a list of albums and their corresponding thumbnail urls
 */
export const useGetAlbums = () =>
  useQuery({
    queryKey: ["albums"],
    queryFn: getAlbumsAndThumbnails,
  });

export interface AlbumInfo {
  albumName: string;
  albumDesc: string | null;
  numFiles: number;
  thumbnailUrl: string;
}

/**
 * Retrieves all albums and their corresponding thumbnail urls.
 * @returns {Promise<AlbumInfo[]>} a list of albums and their corresponding thumbnail urls
 */
const getAlbumsAndThumbnails = async (): Promise<AlbumInfo[]> => {
  const albumsData = await getAlbumsData();
  const thumbnailUrlPromises = albumsData.map(async (albumData) => {
    const { files } = albumData;
    // There should only be one file in the response; the thumbnail
    const { discordId } = files[0];
    return await getFileUrl(discordId, AllowedMimeType.PNG, true);
  });
  const thumbnailUrls = await Promise.all(thumbnailUrlPromises);

  const albumsInfo: AlbumInfo[] = albumsData.map((album, i) => {
    return {
      albumName: album.albumName,
      albumDesc: album.description,
      numFiles: album._count.files,
      thumbnailUrl: thumbnailUrls[i],
    };
  });
  return albumsInfo;
};
