import SvgIcon from "../SvgIcon/SvgIcon";
import styles from './ShowFIlter.module.scss';

const ShowFilter = () => {
  return (
    <div className={styles.wrapper}>
      <label>Показывать</label>
      <div className={styles.select}>
        <div className={styles.currentValue}>
          <span>10</span>
          <SvgIcon iconName="chevron-down" />
        </div>
      </div>
    </div>
  );
};

export default ShowFilter;
