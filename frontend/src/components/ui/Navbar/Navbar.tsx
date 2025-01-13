import { useNavigate } from "react-router";
import polaroidsIcon from "../../../public/polaroids_icon.png";
import NavbarCSS from "./Navbar.module.css";

/**
 * A navbar that displays the logo.
 */
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={NavbarCSS["navbar"]}>
      <div
        className={NavbarCSS["logo"]}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={polaroidsIcon} alt="" />
        <h1>polaroids</h1>
      </div>
    </div>
  );
};

export default Navbar;
