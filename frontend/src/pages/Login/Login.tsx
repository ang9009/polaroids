import { Button } from "@chakra-ui/react";
import LoginCSS from "./Login.module.css";

const Login = () => {
  return (
    <div className={LoginCSS["page-container"]}>
      <div className={LoginCSS["card-container"]}>
        <h1>Welcome back</h1>
        <p>Sign in to your account</p>
        <Button colorPalette={"cyan"} variant={"surface"} size={"xl"}>
          Sign in with Discord
        </Button>
        <p>This instance of polaroids is restricted to whitelisted users</p>
      </div>
    </div>
  );
};

export default Login;
