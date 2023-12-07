import { useContext, useEffect, useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Pagination.module.scss";
import { PromotionsContext } from "../../pages/PromotionsPage/context/PromotionsContext";

const getPagesCount = (data, showItems) => {
  return Math.round(data.length / showItems);
};

const Pagination = ({ data, showItems }) => {
  // const [pagesCount, setPagesCount] = useState(getPagesCount(data, showItems));
  // const [currentPage, setCurrentPage] = useState(1);
  const {state: {currentPage, pagesCount}, dispatch} = useContext(PromotionsContext);

  console.log(currentPage, pagesCount);

  useEffect(() => {
    dispatch({type: 'SET_PAGES_COUNT', payload: getPagesCount(data, showItems)});
  }, [showItems, data]);

  useEffect(() => {
    if ((pagesCount !== null) && (currentPage > pagesCount)) {
      dispatch({type: 'SET_CURRENT_PAGE', payload: pagesCount})
    }
  }, [pagesCount]);

  // const updatePagesCount = () => {
  //   dispatch({type: 'SET_PAGES_COUNT', payload: currentPage + 1})
  // };

  const nextPage = () => {
    if (currentPage === pagesCount) return;
    dispatch({type: 'SET_CURRENT_PAGE', payload: currentPage + 1})
  };

  const prevPage = () => {
    if (currentPage === 1) return;
    dispatch({type: 'SET_CURRENT_PAGE', payload: currentPage - 1})
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.currentPage}>
        <label>Страница</label>
        <input
          type="number"
          onChange={(e) => dispatch({type: 'SET_CURRENT_PAGE', payload: e.target.value})}
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
