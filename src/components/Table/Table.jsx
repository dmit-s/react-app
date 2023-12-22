import { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import AddBtn from "./components/AddBtn/AddBtn";
import DeletionBlock from "./components/DeletionBlock/DeletionBlock";
import TableCell from "./components/TableCell/TableCell";

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
  tabPanel,
  selectable,
  handleAddItem,
  headers,
  data,
  showItems,
  currentPage,
  handleRemove,
  nothingFoundMessage = "Nothing Found",
  filters,
  editItem,

}) => {
  const [slicedData, setSlicedData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [activeTableCell, setActiveTableCell] = useState('');

  useEffect(() => {
    if (filters) {
      setSlicedData(sliceData(data, showItems));
    }
  }, [data, showItems]);

  useEffect(() => {
    updateCheckedItems();
  }, [data]);

  const handleCheck = (e, itemId) => {
    if (e.target.checked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    }
  };

  const handleCheckAll = (isChecked) => {
    if (!isChecked) {
      setCheckedItems(
        checkedItems.filter(
          (id) => !slicedData[currentPage - 1].some((item) => item.id === id)
        )
      );
    } else {
      setCheckedItems([
        ...checkedItems,
        ...slicedData[currentPage - 1].map((item) => item.id),
      ]);
    }
  };

  const updateCheckedItems = () => {
    setCheckedItems(
      data.filter((item) => checkedItems.indexOf(item.id) !== -1)
    );
  };

  const toggleActive = (id) => {
    setActiveTableCell(id);
  }

  return (
    <div className={styles.wrapper}>
      {/* {adding && <AddBtn handleClick={handleAddItem} />} */}

      {(filters ? slicedData.length : data.length) === 0 ? (
        <span>{nothingFoundMessage}</span>
      ) : (
        <div className={styles.tableContainer}>
          {data.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  {selectable && (
                    <th>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckAll(e.target.checked)}
                        checked={slicedData[currentPage - 1].every(
                          (item) => checkedItems.indexOf(item.id) > -1
                        )}
                      />
                    </th>
                  )}
                  {Object.keys(headers).map((key) => (
                    <th key={key}>{headers[key]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(filters ? slicedData[currentPage - 1] : data).map(
                  ({ id, data }) => (
                    <tr
                      key={id}
                      onClick={(e) =>
                        handleAddItem ? handleAddItem(e, id) : undefined
                      }
                    >
                      {selectable && (
                        <td>
                          <input
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleCheck(e, id)}
                            type="checkbox"
                            checked={checkedItems.includes(id)}
                          />
                        </td>
                      )}
                      {Object.keys(headers).map((key) => (
                        <TableCell
                          key={key}
                          id={id}
                          content={data[key].content}
                          removable={data[key]?.options?.removable}
                          editable={data[key]?.options?.editable}
                          editFunc={editItem}
                          removeFunc={handleRemove}
                          toggleActive={toggleActive}
                          activeId={activeTableCell}
                          tabPanel={tabPanel}
                        />
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      )}

      {selectable && (
        <DeletionBlock
          handleRemove={handleRemove}
          checkedItems={checkedItems}
        />
      )}
    </div>
  );
};

export default Table;
