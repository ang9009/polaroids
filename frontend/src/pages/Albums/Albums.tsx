/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import { Box, Button, Skeleton, Text } from "@chakra-ui/react";
import { useGetAlbums } from "../../hooks/useGetAlbums";
import EmptyGraphic from "../../public/empty_graphic.svg?react";
import { AlbumCard } from "./../../components/AlbumCard/AlbumCard";
import AlbumsCSS from "./Albums.module.css";

/**
 * Shows a grid of all albums.
 */
const Albums = () => {
  const { data: albumsData, isPending } = useGetAlbums();

  if (isPending) {
    return <LoadingGrid />;
  } else if (albumsData?.length === 0) {
    return (
      <Box
        height={"calc(100% - {sizes.breadcrumbHeight})"}
        className={AlbumsCSS["no-albums-msg-container"]}
      >
        <EmptyGraphic className={AlbumsCSS["empty-graphic"]} />
        <Text color={"secondaryText"} className={AlbumsCSS["no-albums-msg"]}>
          Albums you create will be shown here
        </Text>
        <Button colorPalette={"purple"} variant={"surface"}>
          Create album
        </Button>
      </Box>
    );
  }
  return (
    <div className={AlbumsCSS["cards-container"]}>
      {albumsData?.map((album) => {
        return <AlbumCard albumInfo={album} key={album.albumName} />;
      })}
    </div>
  );
};

/**
 * A grid of loading skeletons.
 */
function LoadingGrid({ pageSize }: { pageSize?: number }) {
  return (
    <div className={AlbumsCSS["cards-container"]}>
      {[...Array(pageSize || 9).keys()].map((i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
}

export default Albums;
