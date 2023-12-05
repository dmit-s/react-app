import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from './Layout.module.scss';
 
const Layout = () => {
  return (
    <div className={`container ${styles.layout}`}>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
