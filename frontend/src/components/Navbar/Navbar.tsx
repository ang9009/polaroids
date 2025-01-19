/* eslint-disable jsdoc/require-returns */
import { Box, Icon, IconButton } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import polaroidsIcon from "../../public/polaroids_icon.png";
import { SkeletonText } from "../ui/skeleton";
import { UserWidget } from "../UserWidget/UserWidget";
import NavbarCSS from "./Navbar.module.css";

/**
 * A navbar that displays the logo and a user widget.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { data: user, isPending, error } = useUser();

  return (
    <Box className={NavbarCSS["navbar"]} border={"primary"}>
      <div
        className={NavbarCSS["logo"]}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={polaroidsIcon} alt="" />
        <h1>polaroids</h1>
      </div>
      <div className={NavbarCSS["nav-right"]}>
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
        {isPending ? (
          <SkeletonText noOfLines={2} width="40" />
        ) : (
          <>{user && <UserWidget user={user} />}</>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
