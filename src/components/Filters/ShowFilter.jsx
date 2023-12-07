import { useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./ShowFIlter.module.scss";

const ShowFilter = ({ data, showItems, setShowItems }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => setActive(!active);

  const changeShowItems = (e) => {
    const value = e.target.dataset.value;

    setShowItems(value);
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
          {data &&
            data.map((item, index) => {
              if (index + 1 > 10 && (index + 1) % 10 === 0) {
                return (
                  <li key={index} onClick={changeShowItems} data-value={index + 1}>
                    {index + 1}
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
};

export default ShowFilter;
