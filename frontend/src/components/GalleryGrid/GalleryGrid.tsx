/* eslint-disable jsdoc/require-returns */
import { Box, Skeleton } from "@chakra-ui/react";
import { useGetMedia } from "../../hooks/useGetMedia";
import GalleryGridCSS from "./GalleryGrid.module.css";

/**
 * Displays a grid gallery of files.
 */
const GalleryGrid = () => {
  const pageSize = 9;
  const { isPending, data: files } = useGetMedia(pageSize);

  return (
    <Box
      width={"calc(100vw - {sizes.sidebarWidth})"}
      height={"100%"}
      maxHeight={"calc(100vh - {sizes.navbarHeight})"}
      className={GalleryGridCSS["grid-container"]}
    >
      {isPending
        ? [...Array(10).keys()].map((i) => <Skeleton key={i} />)
        : files?.map((file) => {
            const url = URL.createObjectURL(file);
            return <img src={url} alt="" className={GalleryGridCSS["file-item"]} key={url} />;
          })}
    </Box>
  );
};

export default GalleryGrid;
