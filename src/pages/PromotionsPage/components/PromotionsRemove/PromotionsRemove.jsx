import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import styles from './PromotionsRemove.module.scss';

const PromotionsRemove = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        Количество выбранных позиций: <span>3</span>
      </div>
      <button>
        <SvgIcon iconName="trash" />
        Удалить
      </button>
    </div>
  );
};

export default PromotionsRemove;
