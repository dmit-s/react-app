import styles from "./Filters.module.scss";

import ShowFilter from "./ShowFilter";
import Pagination from "./Pagination";

const Filters = () => {
  return (
    <div className={styles.wrapper}>
      <ShowFilter />
      <Pagination />
    </div>
  );
};

export default Filters;
