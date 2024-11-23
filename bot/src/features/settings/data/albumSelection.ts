import { AlbumSelectionType } from "./albumSelectionType";

/**
 * The two types of selections that a user can make when linking a channel to an
 * album. If the user wants to create a new album, then the selection value is not required.
 */
export type AlbumSelection =
  | { type: AlbumSelectionType.CREATE_NEW }
  | { type: AlbumSelectionType.EXISTING; albumName: string };
