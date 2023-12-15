import styles from "./Table.module.scss";

const Table = ({ headers, items, data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr onClick={(e) => openModal(e, id)}>
            <td>
              <input
                onClick={(e) => e.stopPropagation()}
                onChange={handleChange}
                type="checkbox"
                checked={checked}
              />
            </td>
            <td>{category || "-"}</td>
            <td>{subcategory || "-"}</td>
            <td>{brand || "-"}</td>
            <td>{goods || "-"}</td>
            <td>{cashback ? `${cashback}%` : "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
