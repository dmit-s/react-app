import { useContext, useEffect, useState } from "react";
import Filters from "../../../../components/Filters/Filters";
import styles from "./PromotionsTop.module.scss";
import { PromotionsContext } from "../../context/PromotionsContext";

const PromotionsTop = ({ openModal }) => {
  const {
    state: { promotionsData },
  } = useContext(PromotionsContext);

  return (
    <div className={styles.wrapper}>
      <Filters data={promotionsData} />
      <button onClick={openModal} className={styles.addBtn}>
        Добавить акцию
      </button>
    </div>
  );
};

export default PromotionsTop;
