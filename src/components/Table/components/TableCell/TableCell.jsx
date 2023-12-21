import { useEffect, useRef, useState } from "react";
import SvgIcon from "../../../SvgIcon/SvgIcon";
import styles from "./TableCell.module.scss";
import useOutsideClick from "../../../../hooks/useOutsideClick";

const TableCell = ({
  id,
  editable,
  removable,
  content,
  editFunc,
  removeFunc,
  activeId,
  toggleActive,
}) => {
  const [isEditting, setEdding] = useState(false);
  const [value, setValue] = useState(content);
  const inputRef = useRef();

  useEffect(() => {
    if (isEditting) {
      inputRef.current.focus();
    }
  }, [isEditting]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleEdit = () => {
    setEdding(!isEditting);

    if (isEditting) {
      editFunc(id, value);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    removeFunc(id);
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggleActive(id);
  };

  const handleBlur = () => {
    setEdding(false);
    editFunc(id, value);
  };

  return (
    <td
      onClick={editable && handleClick}
      style={{ cursor: `${editable && "pointer"}` }}
      className={`${styles.wrapper} ${activeId === id && styles.active}`}
    >
      <div className={styles.flexContainer}>
        <input
          ref={inputRef}
          className={styles.content}
          type="text"
          value={value || "-"}
          disabled={!isEditting}
          onChange={handleChange}
          onBlur={editable && handleBlur}
        />

        <div className={styles.buttonsContainer}>
          {editable && (
            <button onClick={handleEdit} className={styles.editBtn}>
              <SvgIcon iconName="edit" />
            </button>
          )}

          {removable && (
            <button onClick={handleRemove} className={styles.removeBtn}>
              <SvgIcon iconName="trash" />
            </button>
          )}
        </div>
      </div>
    </td>
  );
};

export default TableCell;
