import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { ApiRoutes } from "../../data/apiRoutes";
import DiscordIcon from "../../public/discord_icon.svg?react";
import LoginCSS from "./Login.module.css";

const Login = () => {
  const { VITE_API_URL } = import.meta.env;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={LoginCSS["page-container"]}>
      <div className={LoginCSS["card-container"]}>
        <Text textStyle={"title"}>Welcome back</Text>
        <form
          action={`${VITE_API_URL}${ApiRoutes.DiscordLogin}`}
          onSubmit={() => setIsLoading(true)}
          method="post"
        >
          <Button
            colorPalette={"purple"}
            variant={"surface"}
            size={"xl"}
            className={LoginCSS["login-btn"]}
            type="submit"
            loading={isLoading}
          >
            <DiscordIcon className={LoginCSS["discord-icon"]} />
            Sign in with Discord
          </Button>
        </form>
        <Text color={"secondaryText"} textStyle={"body"}>
          polaroids is restricted to whitelisted users. Please sign in with your main account.
        </Text>
      </div>
    </div>
  );
};

export default Login;
