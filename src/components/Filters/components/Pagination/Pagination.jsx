
import { useEffect } from "react";
import styles from "./Pagination.module.scss";
import SvgIcon from "../../../SvgIcon/SvgIcon";

const getPagesCount = (data, showItems) => {
  const res = Math.ceil(data.length / showItems);
  return res > 0 ? res : 1;
};

const Pagination = ({ data, currentPage, pagesCount, showItems, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: "SET_PAGES_COUNT",
      payload: getPagesCount(data, showItems),
    });
  }, [showItems, data]);

  useEffect(() => {
    if (currentPage > getPagesCount(data, showItems)) {
      changeCurrentPage(getPagesCount(data, showItems));
    }
  }, [showItems, data]);

  const nextPage = () => {
    if (currentPage === pagesCount) return;
    dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage + 1 });
  };

  const prevPage = () => {
    if (currentPage === 1) return;
    dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage - 1 });
  };

  const changeCurrentPage = (value) => {
    let num;
    if (!value || value <= 0) {
      num = 1;
    } else if (value > pagesCount) {
      num = pagesCount;
    } else {
      num = value;
    }

    dispatch({ type: "SET_CURRENT_PAGE", payload: num });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.currentPage}>
        <label>Страница</label>
        <input
          type="number"
          onChange={(e) => changeCurrentPage(e.target.value)}
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