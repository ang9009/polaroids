import { Outlet } from "react-router";
import Sidebar from "../../components/ui/sidebar/Sidebar";

/**
 * Used for all pages that have a sidebar.
 */
const SidebarLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
