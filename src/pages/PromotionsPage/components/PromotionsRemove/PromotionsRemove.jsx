import { useContext } from "react";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import styles from './PromotionsRemove.module.scss';
import { PromotionsContext } from "../../context/PromotionsContext";

const PromotionsRemove = () => {
  const {state: {checkedCount}} = useContext(PromotionsContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        Количество выбранных позиций: <span>{checkedCount}</span>
      </div>
      <button>
        <SvgIcon iconName="trash" />
        Удалить
      </button>
    </div>
  );
};

export default PromotionsRemove;
