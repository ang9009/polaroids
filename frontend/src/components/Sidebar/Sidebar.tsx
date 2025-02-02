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

import { useEffect, useMemo, useState } from "react";
import { IconType } from "react-icons/lib";
import { useLocation, useNavigate } from "react-router";
import SidebarCSS from "./Sidebar.module.css";

/**
 * Sidebar used for navigation between routes.
 */
const Sidebar = () => {
  const navigate = useNavigate();

  // Maps the sidebar tab label to its icon and route name
  const tabLabelToIconRoute: Record<string, [IconType, string]> = useMemo(() => {
    return {
      Media: [IoIosImages, ""],
      Photos: [IoCameraOutline, "photos"],
      Videos: [IoFilmOutline, "videos"],
      Albums: [IoFolderOutline, "albums"],
      People: [IoPeopleOutline, "people"],
      Bin: [IoTrashOutline, "bin"],
    };
  }, []);
  const { pathname: fullPath } = useLocation();
  const [currPathLabel, setCurrPathLabel] = useState<string>();

  useEffect(() => {
    const pathName = fullPath.split("/")[1];
    // Find the corresponding tab label that matches the current path
    const currPathLabel = Object.entries(tabLabelToIconRoute).find(
      (item) => item[1][1] === pathName,
    )?.[0];
    if (currPathLabel !== undefined) {
      setCurrPathLabel(currPathLabel);
    }
  }, [fullPath, tabLabelToIconRoute]);

  return (
    <Box
      className={SidebarCSS["sidebar-container"]}
      width={"{sizes.sidebarWidth}"}
      height={"calc(100vh - {sizes.navbarHeight})"}
    >
      <Tabs.Root variant={"subtle"} orientation={"vertical"} value={currPathLabel}>
        <Tabs.List width={"100%"}>
          {Object.entries(tabLabelToIconRoute).map((entry) => {
            const [label, [iconType, route]] = entry;
            return (
              // Using a link element here will cause the trigger to make the
              // link redirect to the base route. DO NOT USE THE LINK ELEMENT
              <Tabs.Trigger key={label} value={label} onClick={() => navigate(route)}>
                {iconType({})}
                {label}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
};

export default Sidebar;
