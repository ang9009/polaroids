import { AlbumDropdownInteraction } from "../data/albumDropdownInteraction";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { showAlbumDropdown } from "./showAlbumDropdown";

export const handleAlbumSelection = async (
  interaction: AlbumDropdownInteraction,
  message: string,
) => {
  await showAlbumDropdown(interaction, (selection) => {
    if (selection.type == AlbumSelectionType.CREATE_NEW) {
      // Show modal
    } else {
      // Link existing album and show success message
    }
  });
};
