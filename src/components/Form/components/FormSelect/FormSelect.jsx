import SvgIcon from "../../../SvgIcon/SvgIcon";
import styles from "./FormSelect.module.scss";

const FormSelect = ({
  name,
  activeSelect,
  value,
  title,
  error,
  placeholder,
  toggleSelect,
  optionsData,
  updateFormData,
}) => {
  const showList = () => {
    toggleSelect(name);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const value = e.target.dataset.value;
    updateFormData(name, value);
    toggleSelect(name);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.title}>{title}</label>
      <div className={styles.select}>
        <div onClick={showList} className={styles.inputWrapper}>
          <input disabled type="text" value={value} placeholder={placeholder} />
          <SvgIcon iconName="chevron-down" />
        </div>
        {activeSelect === name && (
          <ul className={styles.selectOptions}>
            {optionsData &&
              optionsData.map((item) => (
                <li
                  key={item}
                  onClick={handleClick}
                  className={styles.selectOption}
                  data-value={item}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
      <small className={styles.error}>{error}</small>
    </div>
  );
};

export default FormSelect;