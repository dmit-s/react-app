import { useContext, useEffect, useState } from "react";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import styles from "./PromotionsRemove.module.scss";
import { PromotionsContext } from "../../context/PromotionsContext";

const PromotionsRemove = () => {
  const {
    state: { promotionsData, checkedCount },
    dispatch,
  } = useContext(PromotionsContext);

  const [show, setShow] = useState(false);

  useEffect(() => {
    Boolean(checkedCount) ? setShow(true) : setShow(false);
  }, [checkedCount]);

  const handleRemove = () => {
    const filteredArr = promotionsData.filter((el) => !el.checked);
    dispatch({ type: "SET_PROMOTIONS", payload: filteredArr });
  };

  return (
    <div className={`${styles.wrapper} ${show && styles.show}`}>
      <div className={styles.body}>
        Количество выбранных позиций: <span>{checkedCount}</span>
      </div>
      <button onClick={handleRemove} className={styles.removeBtn}>
        <SvgIcon iconName="trash" />
        Удалить
      </button>
      <button className={styles.closeBtn}>
        <SvgIcon iconName="close" />
      </button>
    </div>
  );
};

export default PromotionsRemove;
