import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import { toaster } from "../../components/ui/toaster";
import { ApiRoutes } from "../../data/apiRoutes";
import DiscordIcon from "../../public/discord_icon.svg?react";
import LoginCSS from "./Login.module.css";

const Login = () => {
  const { VITE_API_URL } = import.meta.env;
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toaster.create({
        title: "Login failed",
        description: "Please try again",
        type: "error",
        duration: 3000,
        action: { label: "Dismiss", onClick: () => {} },
      });
    }
  }, [error]);

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
