import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Search.module.scss";

import { useState } from "react";

const Search = ({ onSubmit, className, placeholder}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className={`${styles.wrapper} ${className || ""}`}>
      <SvgIcon iconName="search" svgClass={styles.searchIcon} />
      <input onChange={handleChange} type="text" value={value} placeholder={placeholder || ""}/>
      <button className={styles.clearBtn} type="reset">
        <SvgIcon iconName="xmark"/>
      </button>
    </form>
  );
};

export default Search;
