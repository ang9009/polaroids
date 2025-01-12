import { Outlet } from "react-router";
import Navbar from "../../components/ui/Navbar/Navbar";
import NavbarLayoutCSS from "./NavbarLayout.module.css";

// Used for all pages that have a navbar
const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <div className={NavbarLayoutCSS["outlet-container"]}>
        <Outlet />
      </div>
    </>
  );
};

export default NavbarLayout;
