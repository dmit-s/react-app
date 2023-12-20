import styles from "./CategoriesContent.module.scss";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import Table from "../../../../components/Table/Table";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import CategoriesService from "../../../../services/CategoriesService";
import { formatToTableData } from "../../../../helpers/formatToTableData";

const CategoriesContent = () => {
  const {
    state: { categoriesData, subcategoriesData },
    dispatch,
  } = useContext(CategoriesContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // setTableData(
    //   categoriesData.map((item) => {
    //     const obj = {
    //       id: item.id,
    //       data: {},
    //     };

    //     for (let key in item) {
    //       if (key === "id" || key === "subcategories") continue;
  

    //       obj.data[key] = {
    //         content: item[key],
    //         options: {editable: true, removable: true}
    //       };
    //     }
    //     console.log(obj);
    //     return obj;
    //   })
    // );
    setTableData(formatToTableData(categoriesData, ["id", "subcategories"], {removable: true, editable: true}))
  }, [categoriesData]);


  useEffect(() => {
    CategoriesService.getCategories().then((data) =>
      dispatch({ type: "SET_CATEGORIES", payload: data })
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <Table data={tableData} headers={{name: 'Название категории'}}/>
      <SvgIcon iconName="two-chevron-right" />
      {/* <Table data={subcategoriesData} headers={{name: 'Название подкатегории'}}/> */}
    </div>
  );
};

export default CategoriesContent;
