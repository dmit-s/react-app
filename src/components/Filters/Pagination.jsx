import SvgIcon from "../SvgIcon/SvgIcon";
import styles from './Pagination.module.scss';

const Pagination = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.currentPage}>
        <label>Страница</label>
        <input type="number" />
        <span>
          из <span>1</span>
        </span>
      </div>
      <div className={styles.paginationButtons}>
        <button>
          <SvgIcon iconName={"chevron-left"} />
        </button>
        <button>
          <SvgIcon iconName={"chevron-right"} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
