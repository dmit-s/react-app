import styles from "./AddBtn.module.scss";
import purpleBtn from "../../../../styles/purpleBtn.module.scss";
const AddBtn = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={`${purpleBtn.wrapper} ${styles.wrapper}`}
    >
      Добавить акцию
    </button>
  );
};

export default AddBtn;
