import styles from './User.module.scss'
import SvgIcon from "../SvgIcon/SvgIcon";

const User = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.notificationsBtn}>
        <SvgIcon iconName="bell" />
      </button>
      <div className={styles.userInfo}>
        <span>Admin e-mail</span>
      </div>
    </div>
  );
};

export default User;
