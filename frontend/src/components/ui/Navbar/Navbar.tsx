import polaroidsIcon from "../../../public/polaroids_icon.png";
import NavbarCSS from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={NavbarCSS["navbar"]}>
      <div className={NavbarCSS["logo"]}>
        <img src={polaroidsIcon} alt="" />
        <h1>polaroids</h1>
      </div>
    </div>
  );
};

export default Navbar;
