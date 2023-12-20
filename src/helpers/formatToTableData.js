export const formatToTableData = (
  data,
  ignoreKeys = ["id"],
  tableCellOptions = {}
) => {
  return data.map((item) => {
    const obj = {
      id: item.id,
      data: {},
    };

    for (let key in item) {
      if (ignoreKeys.includes(key)) continue;

      obj.data[key] = {
        content: item[key],
        options: { ...tableCellOptions },
      };
    }

    return obj;
  });
};
