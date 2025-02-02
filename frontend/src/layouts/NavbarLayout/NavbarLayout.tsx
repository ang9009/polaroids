/* eslint-disable jsdoc/require-returns */
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import NavbarLayoutCSS from "./NavbarLayout.module.css";

/**
 * Used for all pages that have a navbar.
 */
const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <div className={NavbarLayoutCSS["outlet-container"]}>
        <Box maxHeight={"calc(100vh - {sizes.navbarHeight})"}>
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default NavbarLayout;
