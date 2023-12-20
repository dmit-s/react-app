import { useEffect, useState } from "react";
import styles from "./ShowFilter.module.scss";
import SvgIcon from "../../../SvgIcon/SvgIcon";

const getNumsArr = (data) => {
  const arr = [];
  const maxNum = Math.ceil(data.length / 10);

  if (maxNum === 0) {
    arr.push(10);
  } else {
    for (let i = 1; i <= maxNum; i++) {
      arr.push(i * 10);
    }
  }

  return arr;
};

const ShowFilter = ({ data, showItems, dispatch }) => {
  const [numsArr, setNumsArr] = useState([10]);
  const [active, setActive] = useState(false);

  const handleClick = () => setActive(!active);

  const changeShowItems = (e) => {
    const value = e.target.dataset.value;
    dispatch({ type: "SET_SHOW_ITEMS", payload: value });
  };

  useEffect(() => {
    const numsArr = getNumsArr(data);
    setNumsArr(numsArr);
    if (showItems > numsArr[numsArr.length - 1]) {
      dispatch({
        type: "SET_SHOW_ITEMS",
        payload: numsArr[numsArr.length - 1],
      });
    }
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <label>Показывать</label>
      <div
        onClick={handleClick}
        className={`${styles.select} ${active ? styles.active : "123"}`}
      >
        <div className={styles.currentValue}>
          <span>{showItems}</span>
          <SvgIcon iconName="chevron-down" />
        </div>
        <ul className={styles.list}>
          {numsArr.map((value) => (
            <li key={value} onClick={changeShowItems} data-value={value}>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowFilter;