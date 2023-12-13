import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Select.module.scss";

const Select = ({
  dataForSelect,
  className,
  currentValue,
  activeSelect,
  type,
  changeActiveSelect,
  changeFormData,
  placeholder
}) => {
  // const [currentValue, setCurrentValue] = useState(initialValue || "");

  const handleClick = (text) => {
    changeFormData(type, text);
    changeActiveSelect("");
  };

  const toggleList = () => {
    changeActiveSelect(type);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.content}>
        <div onClick={toggleList} className={styles.currentValue}>
          <input disabled type="text" value={currentValue} placeholder={placeholder}/>
          <SvgIcon iconName="chevron-down" />
        </div>
        <ul
          className={`${styles.list} ${activeSelect === type && styles.active}`}
        >
          {dataForSelect &&
            dataForSelect.map((item, index) => (
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
