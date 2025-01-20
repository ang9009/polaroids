/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import { Box, Skeleton } from "@chakra-ui/react";
import { useEffect } from "react";
import { useGetMedia } from "../../hooks/useGetMedia";
import GalleryGridCSS from "./GalleryGrid.module.css";

interface GalleryGridProps {
  pageSize: number;
}

/**
 * Displays a grid gallery of files.
 */
const GalleryGrid = ({ pageSize }: GalleryGridProps) => {
  const { isPending, data: files, error } = useGetMedia(pageSize);
  useEffect(() => {
    console.log(error, files);
  }, [error, files]);

  return (
    <Box
      width={"calc(100vw - {sizes.sidebarWidth})"}
      height={"100%"}
      maxHeight={"calc(100vh - {sizes.navbarHeight})"}
      className={GalleryGridCSS["grid-container"]}
    >
      {isPending
        ? [...Array(pageSize).keys()].map((i) => <Skeleton key={i} />)
        : files?.map((file) => {
            const url = URL.createObjectURL(file);
            return <img src={url} alt="" className={GalleryGridCSS["file-item"]} key={url} />;
          })}
    </Box>
  );
};

export default GalleryGrid;
