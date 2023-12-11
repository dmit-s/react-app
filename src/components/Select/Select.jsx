import { useEffect, useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Select.module.scss";

const Select = ({
  data,
  className,
  initialValue,
  setSelectActive,
  selectActive,
  type,
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue || "");
  const [showList, setShowList] = useState(false);

  const handleClick = (text) => {
    setCurrentValue(text);
    setSelectActive("");
  };

  const toggleList = () => {
    setShowList(!showList);
    setSelectActive(selectActive === type ? "" : type);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.content}>
        <div onClick={toggleList} className={styles.currentValue}>
          <input disabled type="text" value={currentValue} />
          <SvgIcon iconName="chevron-down" />
        </div>
        <ul
          className={`${styles.list} ${selectActive === type && styles.active}`}
        >
          {data &&
            data.map((item, index) => (
              <li key={index} onClick={(e) => handleClick(e.target.innerText)}>
                {item}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
