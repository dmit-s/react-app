import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Search.module.scss";

const Search = ({ onSubmit, className, placeholder, searchValue, handleChange}) => {
  return (
    <form onSubmit={onSubmit} className={`${styles.wrapper} ${className || ""}`}>
      <SvgIcon iconName="search" svgClass={styles.searchIcon} />
      <input onChange={(e) => handleChange(e.target.value)} type="text" value={searchValue} placeholder={placeholder || ""}/>
      <button className={styles.clearBtn} type="reset">
        <SvgIcon iconName="xmark"/>
      </button>
    </form>
  );
};

export default Search;
