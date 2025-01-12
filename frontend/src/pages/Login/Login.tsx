import { Button, Text } from "@chakra-ui/react";
import DiscordIcon from "../../public/discord-icon.svg?react";
import LoginCSS from "./Login.module.css";

const Login = () => {
  return (
    <div className={LoginCSS["page-container"]}>
      <div className={LoginCSS["card-container"]}>
        <Text textStyle={"title"}>Welcome back</Text>
        <Button
          colorPalette={"purple"}
          variant={"surface"}
          size={"xl"}
          className={LoginCSS["login-btn"]}
        >
          <DiscordIcon className={LoginCSS["discord-icon"]} />
          Sign in with Discord
        </Button>
        <Text color={"secondaryText"} textStyle={"body"}>
          This instance of polaroids is restricted to whitelisted users. Please login with your main
          account.
        </Text>
      </div>
    </div>
  );
};

export default Login;
