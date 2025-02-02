/* eslint-disable jsdoc/require-returns */
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarLayoutCSS from "./SidebarLayout.module.css";

/**
 * Used for all pages that have a sidebar.
 */
const SidebarLayout = () => {
  return (
    <Box className={SidebarLayoutCSS["layout-container"]}>
      <Sidebar />
      <Box
        width={"calc(100vw - {sizes.sidebarWidth})"}
        maxHeight={"calc(100vh - {sizes.navbarHeight})"}
        className={SidebarLayoutCSS["outlet-container"]}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SidebarLayout;
