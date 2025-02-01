/* eslint-disable jsdoc/require-returns */
import { Box, BreadcrumbLink } from "@chakra-ui/react";
import { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BreadcrumbRoot } from "../../components/ui/breadcrumb";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import SidebarLayoutCSS from "./SidebarLayout.module.css";

/**
 * Used for all pages that have a sidebar.
 */
const SidebarLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathSectionToLink = useMemo<Map<string, string>>(() => {
    const pathNames = pathname.split("/");
    pathNames.shift(); // First element is an empty string
    const cappedPathNames = pathNames.map((name) => capitalizeFirstLetter(name));
    const pathLinks = pathNames.map((_, i) => pathNames.slice(0, i + 1).join("/"));

    const pathSectionToLink: Map<string, string> = new Map();
    for (let i = 0; i < cappedPathNames.length; i++) {
      pathSectionToLink.set(cappedPathNames[i], pathLinks[i]);
    }
    return pathSectionToLink;
  }, [pathname]);

  return (
    <div className={SidebarLayoutCSS["layout-container"]}>
      <Sidebar />
      <Box
        width={"calc(100vw - {sizes.sidebarWidth})"}
        height={"calc(100vh - {sizes.navbarHeight})"}
        className={SidebarLayoutCSS["outlet-container"]}
      >
        <BreadcrumbRoot variant="plain" size="md" className={SidebarLayoutCSS["breadcrumb"]}>
          {[...pathSectionToLink.keys()].map((pathSection) => {
            const link = pathSectionToLink.get(pathSection)!;
            return (
              <BreadcrumbLink
                key={link}
                className={SidebarLayoutCSS["breadcrumb-link"]}
                onClick={() => navigate(link)}
              >
                {pathSection}
              </BreadcrumbLink>
            );
          })}
        </BreadcrumbRoot>
        <Outlet />
      </Box>
    </div>
  );
};

export default SidebarLayout;
