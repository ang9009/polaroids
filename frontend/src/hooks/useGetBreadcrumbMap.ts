import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useGetAlbums } from "./useGetAlbums";

/**
 * Returns a map that maps capitalized breadcrumb path segments to their
 * respective paths/links.
 * @returns {Map<string, string> | undefined} a map that maps capitalized
 * breadcrumb path segments to their respective paths/links, or undefined if
 * background fetches are incomplete
 */
export const useGetBreadcrumbMap = () => {
  const { pathname } = useLocation();
  const { data: albums } = useGetAlbums();
  const [breadcrumbMap, setBreadcrumbMap] = useState<Map<string, string> | undefined>(undefined);

  useEffect(() => {
    if (!albums) {
      return undefined;
    }
    const pathNames = pathname.split("/");
    pathNames.shift(); // First element is an empty string, so we remove it

    // Path should be of format albums/albumId/folder1Id/folder2Id...
    const pathSectionToLink: Map<string, string> = new Map();
    pathSectionToLink.set("Albums", `/albums`);
    if (pathNames.length === 1) {
      setBreadcrumbMap(pathSectionToLink);
      return;
    }

    const albumId = pathNames[1];
    const albumName = albums?.find((album) => album.albumId === albumId)?.albumName;
    if (!albumName) {
      return;
    }
    pathSectionToLink.set(albumName, `/albums/${albumId}`);

    // ! Incomplete, folders not implemented yet, so can't do this
    const pathLinks = pathNames.map((_, i) => pathNames.slice(0, i + 1).join("/"));
    // for (let i = 2; i < pathNames.length; i++) {
    //   pathSectionToLink.set(cappedPathNames[i], pathLinks[i]);
    // }
    setBreadcrumbMap(pathSectionToLink);
  }, [pathname, albums]);

  return breadcrumbMap;
};
