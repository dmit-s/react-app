import { NavLink } from "react-router-dom";
import SvgIcon from "../SvgIcon/SvgIcon";

const NavBarLink = () => {
  return (
    <NavLink>
      <SvgIcon iconName={"cities"} svgClass="nav-icon" />
    </NavLink>
  );
};

export default NavBarLink;
