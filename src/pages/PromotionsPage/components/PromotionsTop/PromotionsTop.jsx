import Filters from "../../../../components/Filters/Filters";
import styles from "./PromotionsTop.module.scss";

const PromotionsTop = () => {
  return (
    <div className={styles.wrapper}>
      <Filters/>
      <button className={styles.addBtn}>Добавить акцию</button>
    </div>
  );
};

export default PromotionsTop;
