/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import { Box, Skeleton } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetMediaThumbnails } from "../../hooks/useGetMedia";
import { toaster } from "../ui/toaster";
import GalleryGridCSS from "./GalleryGrid.module.css";

interface GalleryGridProps {
  pageSize: number;
}

/**
 * Displays a grid gallery of files.
 */
const GalleryGrid = ({ pageSize }: GalleryGridProps) => {
  const { isPending, isFetchingNextPage, data, hasNextPage, fetchNextPage, error } =
    useGetMediaThumbnails(pageSize);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  // Set thumbnails once new data comes in
  useEffect(() => {
    if (!data) {
      return;
    }
    const newThumbnails = data.pages.map((page) => page.mediaUrls).flat();
    setThumbnails(newThumbnails);
  }, [data]);

  // Infinite scroll observer
  const observer = useRef<IntersectionObserver>(undefined);
  const lastThumbnailRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (isPending || !hasNextPage) {
        return;
      }
      let { current: observerObj } = observer;
      if (observerObj) {
        observerObj.disconnect();
      }
      observerObj = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
          observer.disconnect();
        } else if (!hasNextPage) {
          observer.disconnect();
        }
      });
      if (node) {
        observerObj.observe(node);
      }
    },
    [isPending, hasNextPage, fetchNextPage],
  );

  // Error toast
  useEffect(() => {
    if (error) {
      toaster.create({
        type: "error",
        description: "Could not fetch images. Please reload and try again",
      });
    }
  }, [error]);

  return (
    <Box className={GalleryGridCSS["grid-container"]}>
      {thumbnails.map((url, i) => {
        if (i === thumbnails.length - 1 && hasNextPage) {
          return (
            <img
              src={url}
              ref={lastThumbnailRef}
              className={GalleryGridCSS["file-item"]}
              key={url}
            />
          );
        }
        return <img src={url} className={GalleryGridCSS["file-item"]} key={url} />;
      })}
      {(isPending || isFetchingNextPage) &&
        [...Array(pageSize).keys()].map((i) => <Skeleton key={i} />)}
    </Box>
  );
};

export default GalleryGrid;
