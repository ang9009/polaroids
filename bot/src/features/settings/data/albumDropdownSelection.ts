import { AlbumSelectionType } from "./albumSelectionType";

/**
 * The two types of dropdown selections that a user can make when linking a channel to an
 * album. If the user wants to create a new album, then the albumName is not required.
 */
export type AlbumDropdownSelection =
  | { type: AlbumSelectionType.CREATE_NEW }
  | {
      type: AlbumSelectionType.EXISTING;
      albumId: string;
      albumName: string;
      albumDesc: string | undefined;
    };
