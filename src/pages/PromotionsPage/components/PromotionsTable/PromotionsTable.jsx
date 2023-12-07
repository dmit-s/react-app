import { useContext, useEffect, useState } from "react";
import styles from "../../../../styles/table.module.scss";
import { PromotionsContext } from "../../context/PromotionsContext";

const PromotionsTable = () => {
  const {
    state: { promotionsData },
  } = useContext(PromotionsContext);

  const [slicedData, setSlicedData] = useState([]);

  const sliceData = () => {
    const newArr = [];

    for(let i = 0; i < promotionsData.length; i++){

      if(i === 0){
        newArr.push([promotionsData[i]]);
      }

      if(((i + 1) % 10 === 0)){
        newArr.push([]);
      }

      newArr[newArr.length - 1].push(promotionsData[i]);
    }

    setSlicedData(newArr);
  }
  console.log(slicedData);
  useEffect(() => {
    sliceData()
  }, [])

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Категория</th>
            <th>Подкатегория</th>
            <th>Бренд</th>
            <th>Товары</th>
            <th>Кешбек</th>
          </tr>
        </thead>
        <tbody>
          {promotionsData.map((item) => (
            <tr key={crypto.randomUUID()}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.category}</td>
              <td>{item.subcategory}</td>
              <td>{item.brand}</td>
              <td>{item.goods}</td>
              <td>{item.cashback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionsTable;
