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
    staleTime: 1000 * 60 * 60,
    retry: false,
    queryKey: ["albums"],
    queryFn: getAlbumsAndThumbnails,
  });

export interface AlbumInfo {
  albumName: string;
  albumDesc: string | null;
  numFiles: number;
  thumbnailUrl: string | null;
}

/**
 * Retrieves all albums and their corresponding thumbnail urls.
 * @returns {Promise<AlbumInfo[]>} a list of albums and their corresponding thumbnail urls
 */
const getAlbumsAndThumbnails = async (): Promise<AlbumInfo[]> => {
  const albumsData = await getAlbumsData();

  const thumbnailUrls: (string | null)[] = [];
  for (const albumData of albumsData) {
    const { files } = albumData;
    // There should only be one file in the response; the thumbnail
    if (files.length === 0) {
      thumbnailUrls.push(null);
      continue;
    }
    const { discordId } = files[0];
    const url = await getFileUrl(discordId, AllowedMimeType.PNG, true);
    thumbnailUrls.push(url);
  }

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
