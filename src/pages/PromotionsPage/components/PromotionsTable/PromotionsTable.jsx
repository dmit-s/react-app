const PromotionsTable = () => {
  return (
    <table>
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
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>Эстетический уход</td>
          <td>Очищение</td>
          <td>-</td>
          <td>-</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>Эстетический уход</td>
          <td>Скрабы</td>
          <td>Academie</td>
          <td>Гоммаж с кремом и витамином У, 50мл</td>
          <td>10%</td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>Эстетический уход</td>
          <td>Тонизация</td>
          <td>Academie</td>
          <td>Нормализующий лосьон, 200мл</td>
          <td>10%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PromotionsTable;
