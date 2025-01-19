import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarCSS from "./Sidebar.module.css";

/**
 * Used for all pages that have a sidebar.
 */
const SidebarLayout = () => {
  return (
    <div className={SidebarCSS["layout-container"]}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
