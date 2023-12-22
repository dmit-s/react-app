import { useEffect, useRef, useState } from "react";
import SvgIcon from "../../../SvgIcon/SvgIcon";
import styles from "./TableCell.module.scss";

const TableCell = ({
  id,
  editable,
  removable,
  content,
  editFunc,
  removeFunc,
  activeId,
  toggleActive,
  tabPanel
}) => {
  const [isEditting, setEdding] = useState(false);
  const [value, setValue] = useState(content);
  const [prevValue, setPrevValue] = useState(content);
  const inputRef = useRef();

  useEffect(() => {
    if (isEditting) {
      inputRef.current.focus();
    }
  }, [isEditting]);

  const handleChange = (e) => {
    if(e.target.value.length === 0){
      setValue(prevValue);
    } else {
      setValue(e.target.value);
    }
    
  };

  const handleEdit = () => {
    setEdding(!isEditting);

    if (isEditting) {
      editFunc(id, value);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleFocus = (e) => {
    setPrevValue(e.target.value);
  }

  return (
    <td
      onClick={tabPanel && handleClick}
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
          onFocus={editable && handleFocus}
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
