/* eslint-disable jsdoc/require-returns */
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarLayoutCSS from "./SidebarLayout.module.css";

/**
 * Used for all pages that have a sidebar.
 */
const SidebarLayout = () => {
  return (
    <div className={SidebarLayoutCSS["layout-container"]}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
