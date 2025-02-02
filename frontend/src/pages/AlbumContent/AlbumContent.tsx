/* eslint-disable jsdoc/require-returns */

import { useParams } from "react-router";
import GalleryGrid from "../../components/GalleryGrid/GalleryGrid";

/**
 * Displays the contents of an album.
 */
const AlbumContent = () => {
  const { albumId } = useParams();

  return <GalleryGrid albumId={albumId} />;
};

export default AlbumContent;
