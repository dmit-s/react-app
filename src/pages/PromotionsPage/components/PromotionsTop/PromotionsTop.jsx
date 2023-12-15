import { useContext } from "react";
import styles from "./PromotionsTop.module.scss";
import { PromotionsContext } from "../../context/PromotionsContext";
import ShowFilter from "../../../../components/Filters/Filters/components/ShowFilter/ShowFilter";
import Pagination from "../../../../components/Filters/Filters/components/Pagination/Pagination";
import Filters from "../../../../components/Filters/Filters/Filters";

const PromotionsTop = ({ openModal }) => {
  const {
    state: { promotionsData, currentPage, pagesCount, showItems },
    dispatch,
  } = useContext(PromotionsContext);

  return (
    <div className={styles.wrapper}>
        <Filters>
          <ShowFilter
            data={promotionsData}
            showItems={showItems}
            dispatch={dispatch}
          />
          <Pagination
            data={promotionsData}
            currentPage={currentPage}
            pagesCount={pagesCount}
            showItems={showItems}
            dispatch={dispatch}
          />
        </Filters>

      <button onClick={openModal} className={styles.addBtn}>
        Добавить акцию
      </button>
    </div>
  );
};

export default PromotionsTop;
