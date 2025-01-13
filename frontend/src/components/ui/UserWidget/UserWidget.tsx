import { Icon, IconButton } from "@chakra-ui/react";
import { Ref, useRef } from "react";
import { AiFillGithub } from "react-icons/ai";
import { GetUserInfoResponse } from "shared/src/responses/auth/getInfo";
import { ApiRoutes } from "../../../data/apiRoutes";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../../ui/menu";
import UserWidgetCSS from "./UserWidget.module.css";

interface UserWidgetProps {
  user: GetUserInfoResponse;
}

/**
 * The user widget. Allows the user to modify their user settings and logout.
 */
export function UserWidget({ user }: UserWidgetProps) {
  const { VITE_API_URL } = import.meta.env;
  const formRef: Ref<HTMLFormElement> = useRef(null);

  return (
    <>
      <div className={UserWidgetCSS["user-widget"]}>
        <IconButton
          variant="surface"
          onClick={() => {
            window.open("https://github.com/ang9009/polaroids", "_blank");
          }}
        >
          <Icon size="md">
            <AiFillGithub />
          </Icon>
        </IconButton>
        <MenuRoot positioning={{ placement: "bottom" }}>
          <MenuTrigger asChild>
            <img
              className={UserWidgetCSS["user-avatar"]}
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt=""
            />
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="settings">Settings</MenuItem>
            <form ref={formRef} action={`${VITE_API_URL}${ApiRoutes.DiscordLogout}`} method="post">
              <MenuItem color="fg.error" value="logout" onClick={() => formRef.current?.submit()}>
                Logout
              </MenuItem>
            </form>
          </MenuContent>
        </MenuRoot>
      </div>
    </>
  );
}
