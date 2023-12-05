import { NavLink } from "react-router-dom";
import SvgIcon from "../SvgIcon/SvgIcon";
import styles from './NavBarLink.module.scss';

const NavBarLink = ({text, name}) => {
  return (
    <NavLink to={name} className={({isActive}) => `${styles.navlink} ${isActive ? `${styles.active}` : `${styles.navlink}`}`}>
      <SvgIcon iconName={name} svgClass="nav-icon" />
      <span>{text}</span>
    </NavLink>
  );
};

export default NavBarLink;
