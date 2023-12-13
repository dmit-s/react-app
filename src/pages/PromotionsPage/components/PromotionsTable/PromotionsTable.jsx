import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../../../styles/table.module.scss";
import { PromotionsContext } from "../../context/PromotionsContext";
import PromotionsTableItem from "./PromotionsTableItem";

const sliceData = (data, showItems) => {
  const slicedArr = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      slicedArr.push(data.slice(i, showItems));
    } else if (i % showItems === 0) {
      slicedArr.push(data.slice(i, showItems + i));
    }
  }

  return slicedArr;
};

const PromotionsTable = ({openModal}) => {
  const {
    state: { promotionsData, showItems, currentPage },
    dispatch,
  } = useContext(PromotionsContext);

  const [slicedData, setSlicedData] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setSlicedData(sliceData(promotionsData, showItems));
    dispatch({
      type: "UPDATE_CHECKED_COUNT",
    });
  }, [promotionsData, showItems]);

  const handleCheckAll = (isChecked) => {
    setCheckAll(isChecked);

    dispatch({
      type: "SET_ALL_CHECKED",
      payload: {
        ids: slicedData[currentPage - 1].map((item) => item.id),
        checked: isChecked,
      },
    });

    dispatch({
      type: "UPDATE_CHECKED_COUNT",
    });
  };
  useEffect(() => {
    if (slicedData.length === 0) return;
    const everyChecked = slicedData[currentPage - 1].every(
      (item) => item.checked
    );
    if (everyChecked) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [currentPage, slicedData]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                onChange={(e) => handleCheckAll(e.target.checked)}
                type="checkbox"
                checked={checkAll}
              />
            </th>
            <th>Категория</th>
            <th>Подкатегория</th>
            <th>Бренд</th>
            <th>Товары</th>
            <th>Кешбек</th>
          </tr>
        </thead>
        <tbody>
          {Boolean(slicedData.length) &&
            slicedData[currentPage - 1].map((item) => (
              <PromotionsTableItem key={item.id} {...item} openModal={openModal}/>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionsTable;
