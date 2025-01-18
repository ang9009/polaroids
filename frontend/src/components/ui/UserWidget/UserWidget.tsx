/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { GetUserInfoResponse } from "shared/src/responses/auth/getInfo";
import { userQueryKey } from "../../../data/constants";
import { logout } from "../../../services/logout";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../menu";
import { toaster } from "../toaster";
import UserWidgetCSS from "./UserWidget.module.css";

interface UserWidgetProps {
  user: GetUserInfoResponse;
}

/**
 * The user widget. Allows the user to modify their user settings and logout.
 */
export function UserWidget({ user }: UserWidgetProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
        <MenuItem
          color="fg.error"
          value="logout"
          onClick={async () => {
            try {
              await logout();
              await queryClient.invalidateQueries({ queryKey: [userQueryKey] });
              navigate("/login");
            } catch (err) {
              toaster.create({
                title: "An error occurred",
                description: "Please reload the page.",
                type: "error",
              });
            }
          }}
        >
          Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
