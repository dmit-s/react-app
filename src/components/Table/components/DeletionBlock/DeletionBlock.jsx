import styles from "./DeletionBlock.module.scss";
import SvgIcon from "../../../SvgIcon/SvgIcon";
import { useEffect, useState } from "react";

const DeletionBlock = ({ checkedItems, handleRemove }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    Boolean(checkedItems.length) ? setShow(true) : setShow(false);
  }, [checkedItems]);

  return (
    <div className={`${styles.wrapper} ${show && styles.show}`}>
      <div className={styles.body}>
        Количество выбранных позиций: <span>{checkedItems.length}</span>
      </div>
      <button onClick={() => handleRemove(checkedItems)} className={styles.removeBtn}>
        <SvgIcon iconName="trash" />
        Удалить
      </button>
      <button className={styles.closeBtn}>
        <SvgIcon iconName="close" />
      </button>
    </div>
  );
};

export default DeletionBlock;