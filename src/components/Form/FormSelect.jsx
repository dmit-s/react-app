import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./FormSelect.module.scss";

import { useState } from "react";

const FormSelect = ({
  name,
  activeSelect,
  initialValue,
  title,
  error,
  placeholder,
  toggleSelect,
}) => {
  const [value, setValue] = useState(initialValue || "");
  const [optionsData, setOptionsData] = useState([]);

  const showList = () => {
    toggleSelect(name);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setValue(e.target.innerText);
    toggleSelect(name);
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.title}>{title}</label>
      <div className={styles.select}>
        <div onClick={showList} className={styles.inputWrapper}>
          <input
            disabled
            type="text"
            value={value}
            placeholder={placeholder}
          />
          <SvgIcon iconName="chevron-down" />
        </div>
        {activeSelect === name && (
          <ul className={styles.selectOptions}>
            <li onClick={handleClick} className={styles.selectOption}>1</li>
            <li onClick={handleClick} className={styles.selectOption}>1</li>
            <li onClick={handleClick} className={styles.selectOption}>1</li>
          </ul>
        )}
      </div>
      <small className={styles.error}>{error}</small>
    </div>
  );
};

export default FormSelect;
