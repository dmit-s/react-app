import { useContext, useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import purpleBtn from "../../../../styles/purpleBtn.module.scss";
import { PromotionsContext } from "../../context/PromotionsContext";
import PromotionsRemove from "../PromotionsRemove/PromotionsRemove";
import TableItem from "../../../../components/Table/components/TableItem/TableItem";

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



const PromotionsTable = ({ data, openModal }) => {
  const {
    state: { promotionsData, showItems, currentPage },
    dispatch,
  } = useContext(PromotionsContext);

  const [slicedData, setSlicedData] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
      setSlicedData(sliceData(promotionsData, showItems));

      dispatch({
        type: "UPDATE_CHECKED_COUNT",
      });
    }, [promotionsData, showItems]);


  const handleCheckAll = (isChecked) => {
    setCheckAll(isChecked);

    dispatch({
      type: "SET_ALL_CHECKED",
      payload: {
        ids: slicedData[currentPage - 1].map((item) => item.id),
        checked: isChecked,
      },
    });

    dispatch({
      type: "UPDATE_CHECKED_COUNT",
    });
  };
  useEffect(() => {
    if (slicedData.length === 0) return;
    const everyChecked = slicedData[currentPage - 1].every(
      (item) => item.checked
    );
    if (everyChecked) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [currentPage, slicedData]);

  const createHeaders = () => {
    return (
      <>
        <th>
          <input
            onChange={(e) => handleCheckAll(e.target.checked)}
            type="checkbox"
            checked={checkAll}
          />
        </th>
        <th>Категория</th>
        <th>Подкатегория</th>
        <th>Бренд</th>
        <th>Товары</th>
        <th>Кешбек</th>
      </>
    );
  };

  const createItems = () => {
    slicedData[currentPage - 1].map(item => (
      <tr onClick={(e) => openModal(e, id)}>
      <td>
        <input onClick={(e) => e.stopPropagation()} onChange={handleChange} type="checkbox" checked={checked} />
      </td>
      <td>{category || "-"}</td>
      <td>{subcategory || "-"}</td>
      <td>{brand || "-"}</td>
      <td>{goods || "-"}</td>
      <td>{cashback ? `${cashback}%` : "-"}</td>
    </tr>
    ))
  }

  return (
    <div>
      <button onClick={openModal} className={purpleBtn.wrapper}>
        Добавить акцию
      </button>
      <Table currentPage={currentPage} headers={createHeaders()} data={slicedData[currentPage - 1]}/>
      <PromotionsRemove />
    </div>
  );
};

export default PromotionsTable;
