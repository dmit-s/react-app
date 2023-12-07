import styles from "./Filters.module.scss";

import ShowFilter from "./ShowFilter";
import Pagination from "./Pagination";
import {useState } from "react";

const Filters = ({data}) => {
  const [showItems, setShowItems] = useState(10);

  return (
    <div className={styles.wrapper}>
      <ShowFilter data={data} showItems={showItems} setShowItems={setShowItems}/>
      <Pagination data={data} showItems={showItems}/>
    </div>
  );
};

export default Filters;
