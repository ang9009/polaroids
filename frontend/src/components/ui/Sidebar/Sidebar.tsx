import { Box, Tabs } from "@chakra-ui/react";
import { IoIosImages } from "react-icons/io";
import {
  IoCameraOutline,
  IoFilmOutline,
  IoFolderOutline,
  IoPeopleOutline,
  IoTrashOutline,
} from "react-icons/io5";

import SidebarCSS from "./Sidebar.module.css";

/**
 * Sidebar used for navigation between routes.
 */
const Sidebar = () => {
  return (
    <Box
      className={SidebarCSS["sidebar-container"]}
      width={"20rem"}
      height={"calc(100vh - {sizes.navbarHeight})"}
    >
      <Tabs.Root variant={"subtle"} orientation={"vertical"}>
        <Tabs.List width={"100%"}>
          <Tabs.Trigger value="media">
            <IoIosImages />
            Media
          </Tabs.Trigger>
          <Tabs.Trigger value="photos">
            <IoCameraOutline />
            Photos
          </Tabs.Trigger>
          <Tabs.Trigger value="videos">
            <IoFilmOutline />
            Videos
          </Tabs.Trigger>
          <Tabs.Trigger value="albums">
            <IoFolderOutline />
            Albums
          </Tabs.Trigger>
          <Tabs.Trigger value="people">
            <IoPeopleOutline />
            People
          </Tabs.Trigger>
          <Tabs.Trigger value="bin">
            <IoTrashOutline />
            Bin
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
};

export default Sidebar;
