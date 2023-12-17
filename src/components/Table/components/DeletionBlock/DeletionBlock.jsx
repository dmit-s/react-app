import styles from "./DeletionBlock.module.scss";
import SvgIcon from "../../../SvgIcon/SvgIcon";
import { useEffect, useState } from "react";

const DeletionBlock = ({ checkedCount, handleRemove }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    Boolean(checkedCount) ? setShow(true) : setShow(false);
  }, [checkedCount]);

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

export default DeletionBlock;
