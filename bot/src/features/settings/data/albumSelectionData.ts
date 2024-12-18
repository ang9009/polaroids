import { AlbumSelectionType } from "./albumSelectionType";

/**
 * Represents the data of the album that the user wants to link a channel to
 * using the /subscribe function. If the user wants to create a new album, the
 * album name and description are required to do so. If the user wants to use an
 * existing album, only the album name is required.
 */
export type AlbumSelectionData = {
  type: AlbumSelectionType;
  albumName: string;
  albumDesc: string | undefined;
};
