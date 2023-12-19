const CategoriesTable = (headers) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((item) => (
            <th>{item}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default CategoriesTable;
