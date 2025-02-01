import { AlbumCard } from "./../../components/AlbumCard/AlbumCard";
/* eslint-disable jsdoc/require-returns */
import { useGetAlbums } from "../../hooks/useGetAlbums";
import AlbumsCSS from "./Albums.module.css";

/**
 * Shows a grid of all albums.
 */
const Albums = () => {
  const { data: albumsData, isPending } = useGetAlbums();

  return (
    <div className={AlbumsCSS["cards-container"]}>
      {isPending ||
        albumsData!.map((album) => {
          return <AlbumCard albumInfo={album} key={album.albumName} />;
        })}
    </div>
  );
};

export default Albums;
