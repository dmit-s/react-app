import { useContext, useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./ShowFIlter.module.scss";
import { PromotionsContext } from "../../pages/PromotionsPage/context/PromotionsContext";

const ShowFilter = ({ data }) => {
  const {
    state: { showItems },
    dispatch,
  } = useContext(PromotionsContext);

  const [active, setActive] = useState(false);

  const handleClick = () => setActive(!active);

  const changeShowItems = (e) => {
    const value = e.target.dataset.value;
    dispatch({ type: "SET_SHOW_ITEMS", payload: value });
  };

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
          <li onClick={changeShowItems} data-value={10}>
            10
          </li>
          {data.map((item, index) => {
            if (index + 1 > 10 && (index + 1) % 10 === 0) {
              return (
                <li key={index} onClick={changeShowItems} data-value={index + 1}>
                  {index + 1}
                </li>
              );
            }
            if (data.length - 1 === index) {
              return <li key={Math.ceil(data.length / 10) * 10} data-value={Math.ceil(data.length / 10) * 10} onClick={changeShowItems}>{Math.ceil(data.length / 10) * 10}</li>;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default ShowFilter;
