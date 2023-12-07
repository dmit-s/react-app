import { useContext } from "react";
import Filters from "../../../../components/Filters/Filters";
import styles from "./PromotionsTop.module.scss";
import { PromotionsContext } from "../../context/PromotionsContext";

const PromotionsTop = () => {
  const {state, dispatch} = useContext(PromotionsContext);

  return (
    <div className={styles.wrapper}>
      <Filters/>
      <button onClick={() => dispatch({type: '123', payload: 'action'})} className={styles.addBtn}>Добавить акцию</button>
    </div>
  );
};

export default PromotionsTop;
