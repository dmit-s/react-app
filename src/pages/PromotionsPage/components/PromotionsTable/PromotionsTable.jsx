import { useEffect } from "react";
import styles from "../../../../styles/table.module.scss";
import { useState } from "react";
import PromotionsService from "../../../../services/PromotionsService";

const PromotionsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    PromotionsService.getPromotions().then((data) => setData(data));
  }, []);

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
          {data.map((item) => (
            <tr key={item.id}>
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
