/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import { Box, Skeleton } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useGetMediaThumbnails } from "../../hooks/useGetMediaThumbnails";
import GalleryGridCSS from "./GalleryGrid.module.css";

interface GalleryGridProps {
  pageSize?: number;
  query?: string;
  albumId?: string;
}

/**
 * Displays a gallery of photos/videos arranged in a grid. Displays an error
 * message if there was an error while fetching thumbnails.
 */
const GalleryGrid = ({ pageSize, query, albumId }: GalleryGridProps) => {
  const { isPending, isFetchingNextPage, data, hasNextPage, fetchNextPage, error } =
    useGetMediaThumbnails(pageSize, query, albumId);
  const [thumbnails, setThumbnails] = useState<string[] | undefined>(undefined);

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

  if (isPending) {
    return <LoadingGrid pageSize={pageSize} />;
  } else if (error) {
    return <CouldNotFindItemsMsg />;
  } else if (thumbnails && thumbnails.length === 0) {
    return <NoItemsFoundMsg />;
  }

  return (
    <Box className={GalleryGridCSS["grid-container"]}>
      {thumbnails?.map((url, i) => {
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
      {isFetchingNextPage && <LoadingGrid pageSize={pageSize} />}
    </Box>
  );
};

/**
 * The message that is displayed when an error occurs while fetching.
 */
function CouldNotFindItemsMsg() {
  return (
    <Box
      className={GalleryGridCSS["msg-container"]}
      height={"calc(100% - {sizes.breadcrumbHeight})"}
    >
      <h1 className={GalleryGridCSS["msg-title"]}>Album not found</h1>
      <p className={GalleryGridCSS["msg"]}>
        Something went wrong. <Link to={"/albums"}>Click here</Link> to return to the albums page.
      </p>
    </Box>
  );
}

/**
 * The messsage displayed when no items can be found.
 */
function NoItemsFoundMsg() {
  return (
    <Box
      className={GalleryGridCSS["msg-container"]}
      height={"calc(100% - {sizes.breadcrumbHeight})"}
    >
      <h1 className={GalleryGridCSS["msg-title"]}>No items found</h1>
      <p className={GalleryGridCSS["msg"]}>
        This album is empty. Drag files here to add photos/videos, or upload it via the discord bot.
      </p>
    </Box>
  );
}

export default GalleryGrid;

/**
 * A grid of loading skeletons.
 */
function LoadingGrid({ pageSize }: { pageSize?: number }) {
  return (
    <Box className={GalleryGridCSS["grid-container"]}>
      {[...Array(pageSize || 9).keys()].map((i) => (
        <Skeleton key={i} />
      ))}
    </Box>
  );
}
