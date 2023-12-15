import User from "../User/User";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <User />
    </header>
  );
};

export default Header;
