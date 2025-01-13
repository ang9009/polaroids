import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { SkeletonText } from "../../../components/ui/skeleton";
import { useUser } from "../../../hooks/useUser";
import polaroidsIcon from "../../../public/polaroids_icon.png";
import { UserWidget } from "./../UserWidget/UserWidget";
import NavbarCSS from "./Navbar.module.css";

/**
 * A navbar that displays the logo.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { data: user, isPending } = useUser();

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
      <div>
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
