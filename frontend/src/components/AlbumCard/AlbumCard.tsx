/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import { Box, Card } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { AlbumInfo } from "../../hooks/useGetAlbums";
import AlbumCardCSS from "./AlbumCard.module.css";

export interface AlbumCardProps {
  albumInfo: AlbumInfo;
}

/**
 * A card that displays information about an album. Clicking on this card should
 * redirect to the album's content.
 */
export function AlbumCard({ albumInfo }: AlbumCardProps) {
  const navigate = useNavigate();
  return (
    <Card.Root
      className={AlbumCardCSS["card-root"]}
      key={albumInfo.albumName}
      onClick={() => navigate(`/albums/${albumInfo.albumId}`)}
    >
      {albumInfo.thumbnailUrl ? (
        <img src={albumInfo.thumbnailUrl} className={AlbumCardCSS["card-thumbnail"]} />
      ) : (
        <Box background={"gray.900"} className={AlbumCardCSS["card-thumbnail"]}></Box>
      )}

      <Card.Body gap="2" className={AlbumCardCSS["card-body"]}>
        <Card.Title className={AlbumCardCSS["album-name"]}>{albumInfo.albumName}</Card.Title>
        <Card.Description>
          {albumInfo.numFiles} file{albumInfo.numFiles !== 1 ? "s" : ""}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
