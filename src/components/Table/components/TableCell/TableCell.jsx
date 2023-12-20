import SvgIcon from "../../../SvgIcon/SvgIcon";
import styles from "./TableCell.module.scss";

const TableCell = ({ editable, removable, content }) => {
  console.log(editable, removable);
  return (
    <td className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <input
          className={styles.content}
          type="text"
          value={content || "-"}
          readOnly
        />

        <div className={styles.buttonsContainer}>
          {editable && (
            <button className={styles.editBtn}>
              <SvgIcon iconName="edit" />
            </button>
          )}

          {removable && (
            <button className={styles.removeBtn}>
              <SvgIcon iconName="trash" />
            </button>
          )}
        </div>
      </div>
    </td>
  );
};

export default TableCell;
