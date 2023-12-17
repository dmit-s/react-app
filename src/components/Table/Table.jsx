import { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import AddBtn from "./components/AddBtn/AddBtn";
import DeletionBlock from "./components/DeletionBlock/DeletionBlock";

const sliceData = (data, showItems) => {
  const slicedArr = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      slicedArr.push(data.slice(i, showItems));
    } else if (i % showItems === 0) {
      slicedArr.push(data.slice(i, showItems + i));
    }
  }

  return slicedArr;
};

const Table = ({
  adding,
  selectable,
  handleAddItem,
  headers,
  data,
  showItems,
  currentPage,
  handleRemove,
}) => {
  const [slicedData, setSlicedData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setSlicedData(sliceData(data, showItems));
  }, [data, showItems]);

  const handleCheck = (e, itemId) => {
    if (e.target.checked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    }
  };

  const handleAllChecked = () => {
    if (checkedItems.length === slicedData[currentPage - 1].length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(slicedData[currentPage - 1].map((item) => item.id));
    }
  };

  return (
    <div className={styles.wrapper}>
      {adding && <AddBtn handleClick={handleAddItem} />}

      {slicedData.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              {selectable && (
                <th>
                  <input
                    type="checkbox"
                    onChange={handleAllChecked}
                    checked={
                      checkedItems.length === slicedData[currentPage - 1].length
                    }
                  />
                </th>
              )}
              {Object.keys(headers).map((key) => (
                <th key={key}>{headers[key]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slicedData[currentPage - 1].map((item) => (
              <tr key={item.id}>
                {selectable && (
                  <td>
                    <input
                      onClick={(e) => e.stopPropagation()}
                      onChange={handleCheck}
                      type="checkbox"
                      checked={checkedItems.includes(item.id)}
                    />
                  </td>
                )}
                {Object.keys(headers).map((key) => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectable && <DeletionBlock handleRemove={handleRemove} />}
    </div>
  );
};

export default Table;
