/* eslint-disable jsdoc/require-returns */
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import { toaster } from "../../components/ui/toaster";
import { ApiRoutes } from "../../data/apiRoutes";
import { useUser } from "../../hooks/useUser";
import DiscordIcon from "../../public/discord_icon.svg?react";
import LoginCSS from "./Login.module.css";

/**
 * The login page. Users can login via Discord.
 */
const Login = () => {
  const { VITE_API_URL } = import.meta.env;
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const { data: user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (error) {
      toaster.create({
        title: "Login failed",
        description: "Please try again",
        type: "error",
        duration: 3000,
        action: {
          label: "Dismiss",
          // eslint-disable-next-line jsdoc/require-jsdoc
          onClick: () => {},
        },
      });
    }
  }, [error, user, navigate]);

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
