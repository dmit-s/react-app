import { useContext, useEffect, useState } from "react";
import { PromotionsContext } from "../../context/PromotionsContext";

const PromotionsTableItem = ({
  id,
  category,
  subcategory,
  brand,
  goods,
  cashback,
  checked,
}) => {
  const {
    state: { promotionsData },
    dispatch,
  } = useContext(PromotionsContext);

  const handleChange = (e) => {
    dispatch({ type: "SET_CHECKED", payload: { id, value: e.target.checked } });
    dispatch({
      type: "UPDATE_CHECKED_COUNT",
    });
  };

  return (
    <tr>
      <td>
        <input onChange={handleChange} type="checkbox" checked={checked} />
      </td>
      <td>{category}</td>
      <td>{subcategory}</td>
      <td>{brand}</td>
      <td>{goods}</td>
      <td>{cashback}</td>
    </tr>
  );
};

export default PromotionsTableItem;
