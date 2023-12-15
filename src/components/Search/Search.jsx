import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Search.module.scss";

import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <SvgIcon iconName="search" svgClass={styles.searchIcon} />
      <input onChange={handleChange} type="text" value={value} />
      <button className={styles.clearBtn}>
        <SvgIcon iconName="xmark"/>
      </button>
    </div>
  );
};

export default Search;
