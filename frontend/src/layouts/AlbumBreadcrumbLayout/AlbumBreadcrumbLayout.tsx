/* eslint-disable jsdoc/require-returns */
import { BreadcrumbLink } from "@chakra-ui/react";
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
      <BreadcrumbRoot variant="plain" size="md" className={AlbumBreadCrumbLayoutCSS["breadcrumb"]}>
        {breadcrumbMap &&
          [...breadcrumbMap.keys()].map((pathSection) => {
            const link = breadcrumbMap.get(pathSection)!;
            return (
              <BreadcrumbLink
                key={link}
                className={AlbumBreadCrumbLayoutCSS["breadcrumb-link"]}
                onClick={() => navigate(link)}
              >
                {pathSection}
              </BreadcrumbLink>
            );
          })}
      </BreadcrumbRoot>
      <Outlet />
    </>
  );
};

export default AlbumBreadcrumbLayout;
