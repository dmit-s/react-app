import styles from "./Filters.module.scss";

import ShowFilter from "./ShowFilter";
import Pagination from "./Pagination";

const Filters = ({data}) => {
  return (
    <div className={styles.wrapper}>
      <ShowFilter data={data}/>
      <Pagination data={data}/>
    </div>
  );
};

export default Filters;
