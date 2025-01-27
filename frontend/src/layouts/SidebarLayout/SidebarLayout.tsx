/* eslint-disable jsdoc/require-returns */
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BreadcrumbLink, BreadcrumbRoot } from "../../components/ui/breadcrumb";
import SidebarLayoutCSS from "./SidebarLayout.module.css";

/**
 * Used for all pages that have a sidebar.
 */
const SidebarLayout = () => {
  return (
    <div className={SidebarLayoutCSS["layout-container"]}>
      <Sidebar />
      <Box
        width={"calc(100vw - {sizes.sidebarWidth})"}
        height={"calc(100vh - {sizes.navbarHeight})"}
        className={SidebarLayoutCSS["outlet-container"]}
      >
        <BreadcrumbRoot variant="plain" size="md" className={SidebarLayoutCSS["breadcrumb"]}>
          <BreadcrumbLink href="#">Albums</BreadcrumbLink>
          <BreadcrumbLink href="#">Hangout</BreadcrumbLink>
        </BreadcrumbRoot>
        <Outlet />
      </Box>
    </div>
  );
};

export default SidebarLayout;
