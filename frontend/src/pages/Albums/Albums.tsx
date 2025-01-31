/* eslint-disable jsdoc/require-returns */
import { Card } from "@chakra-ui/react";
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
          return (
            <Card.Root className={AlbumsCSS["card-root"]} key={album.albumName}>
              <img
                src={album.thumbnailUrl || "/images/thumbnail-placeholder.jpg"}
                className={AlbumsCSS["card-thumbnail"]}
              />
              {/* ! Handl text overflow, figure out */}
              <Card.Body gap="2" className={AlbumsCSS["card-body"]}>
                <Card.Description>{album.numFiles} files</Card.Description>
                <Card.Title className={AlbumsCSS["album-name"]}>{album.albumName}</Card.Title>
                <Card.Description className={AlbumsCSS["album-desc"]}>
                  {album.albumDesc || ""}
                </Card.Description>
              </Card.Body>
            </Card.Root>
          );
        })}
    </div>
  );
};

export default Albums;
