import SvgIcon from "../../../SvgIcon/SvgIcon";
import styles from "./TableCell.module.scss";

const TableCell = ({ editable, content }) => {
  return (
    <td className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <span className={styles.content}>{content}</span>
        {editable && (
          <div className={styles.buttonsContainer}>
            <button className={styles.editBtn}>
              <SvgIcon iconName="edit" />
            </button>
            <button className={styles.removeBtn}>
              <SvgIcon iconName="trash" />
            </button>
          </div>
        )}
      </div>
    </td>
  );
};

export default TableCell;
