import { Ref, useRef } from "react";
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
    <MenuRoot positioning={{ placement: "bottom-end" }} size="md">
      <MenuTrigger asChild>
        <img
          className={UserWidgetCSS["user-avatar"]}
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
          alt=""
        />
      </MenuTrigger>
      <MenuContent className={UserWidgetCSS["dropdown-container"]}>
        <MenuItem value="settings">Settings</MenuItem>
        <form ref={formRef} action={`${VITE_API_URL}${ApiRoutes.DiscordLogout}`} method="post">
          <MenuItem color="fg.error" value="logout" onClick={() => formRef.current?.submit()}>
            Logout
          </MenuItem>
        </form>
      </MenuContent>
    </MenuRoot>
  );
}
