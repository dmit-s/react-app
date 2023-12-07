import { useEffect, useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Pagination.module.scss";

const getPagesCount = (data, showItems) => {
  return Math.round(data.length / showItems);
};

const Pagination = ({ data, showItems }) => {
  const [pagesCount, setPagesCount] = useState(getPagesCount(data, showItems));
  const [currentPage, setCurrentPage] = useState(1);

  

  useEffect(() => {
    updatePagesCount();
  }, [showItems, data]);

  useEffect(() => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  }, [pagesCount]);

  const updatePagesCount = () => {
    setPagesCount(getPagesCount(data, showItems));
  };

  const nextPage = () => {
    if (currentPage === pagesCount) return;
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.currentPage}>
        <label>Страница</label>
        <input
          type="number"
          onChange={(e) => setCurrentPage(e.target.value)}
          value={currentPage}
        />
        <span>
          из <span>{pagesCount}</span>
        </span>
      </div>
      <div className={styles.paginationButtons}>
        <button onClick={prevPage}>
          <SvgIcon iconName={"chevron-left"} />
        </button>
        <button onClick={nextPage}>
          <SvgIcon iconName={"chevron-right"} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
