/* eslint-disable jsdoc/require-returns */
import { Box, Tabs } from "@chakra-ui/react";
import { IoIosImages } from "react-icons/io";
import {
  IoCameraOutline,
  IoFilmOutline,
  IoFolderOutline,
  IoPeopleOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { IconType } from "react-icons/lib";
import { Link, useNavigate } from "react-router";
import SidebarCSS from "./Sidebar.module.css";

/**
 * Sidebar used for navigation between routes.
 */
const Sidebar = () => {
  const tabLabelToIcon: Record<string, [IconType, string]> = {
    Media: [IoIosImages, "/"],
    Photos: [IoCameraOutline, "/photos"],
    Videos: [IoFilmOutline, "/videos"],
    Albums: [IoFolderOutline, "/albums"],
    People: [IoPeopleOutline, "/people"],
    Bin: [IoTrashOutline, "/bin"],
  };
  const navigate = useNavigate();

  return (
    <Box
      className={SidebarCSS["sidebar-container"]}
      width={"{sizes.sidebarWidth}"}
      height={"calc(100vh - {sizes.navbarHeight})"}
    >
      <Tabs.Root
        variant={"subtle"}
        orientation={"vertical"}
        defaultValue={"Media"}
        navigate={({ value }) => {
          const [_, route] = tabLabelToIcon[value!];
          console.log(route);
          navigate(route);
        }}
      >
        <Tabs.List width={"100%"}>
          {Object.entries(tabLabelToIcon).map((entry) => {
            const [label, [iconType, route]] = entry;
            return (
              <Tabs.Trigger value={label} asChild>
                <Link to={route}>
                  {iconType({})}
                  {label}
                </Link>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
};

export default Sidebar;
