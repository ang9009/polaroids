/* eslint-disable jsdoc/require-returns */
import { BreadcrumbLink } from "@chakra-ui/react";
import { IoAlbumsOutline, IoFolder } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router";
import { BreadcrumbRoot } from "../../components/ui/breadcrumb";
import { useGetBreadcrumbMap } from "../../hooks/useGetBreadcrumbMap";
import AlbumBreadCrumbLayoutCSS from "./AlbumBreadcrumbLayout.module.css";

/**
 * Shows a series of clickable links (breadcrumb) for the album page based on
 * the current link path.
 */
const AlbumBreadcrumbLayout = () => {
  const navigate = useNavigate();
  const breadcrumbMap = useGetBreadcrumbMap();

  return (
    <>
      {breadcrumbMap && (
        <BreadcrumbRoot
          variant="plain"
          size="md"
          className={AlbumBreadCrumbLayoutCSS["breadcrumb"]}
          height="breadcrumbHeight"
        >
          {[...breadcrumbMap.keys()].map((pathSection, i) => {
            const link = breadcrumbMap.get(pathSection)!;
            return (
              <BreadcrumbLink
                key={link}
                className={AlbumBreadCrumbLayoutCSS["breadcrumb-link"]}
                onClick={() => navigate(link)}
              >
                {i <= 1 ? <IoAlbumsOutline /> : <IoFolder />}
                {pathSection}
              </BreadcrumbLink>
            );
          })}
        </BreadcrumbRoot>
      )}
      <Outlet />
    </>
  );
};

export default AlbumBreadcrumbLayout;
