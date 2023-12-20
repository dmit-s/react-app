import styles from "./CategoriesContent.module.scss";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import Table from "../../../../components/Table/Table";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import CategoriesService from "../../../../services/CategoriesService";
import { formatToTableData } from "../../../../helpers/formatToTableData";

const CategoriesContent = () => {
  const {
    state: { categoriesData },
    dispatch,
  } = useContext(CategoriesContext);
  const [categoriesTableData, setCategoriesTableData] = useState([]);
  const [subcategoriesTableData, setSubcategoriesTableData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    setCategoriesTableData(
      formatToTableData(categoriesData, ["id", "subcategories"], {
        removable: true,
        editable: true,
      })
    );
  }, [categoriesData]);

  useEffect(() => {
    const findCategory = categoriesData.find(
      (item) => item.id === activeCategory
    );


    if (findCategory) {
      setSubcategoriesTableData(
        formatToTableData(findCategory.subcategories , ["id"], {
          removable: true,
          editable: true,
        })
      );
    }
  }, [activeCategory, categoriesData]);

  useEffect(() => {
    CategoriesService.getCategories().then((data) =>
      dispatch({ type: "SET_CATEGORIES", payload: data })
    );
  }, []);

  const handleClick = (e, id) => {
    setActiveCategory(id);
  }

  return (
    <div className={styles.wrapper}>
      <Table
        data={categoriesTableData}
        headers={{ name: "Название категории" }}
        handleAddItem={handleClick}
      />
      <SvgIcon iconName="two-chevron-right" />
      <Table
        data={subcategoriesTableData}
        headers={{ name: "Название подкатегории" }}
      />
    </div>
  );
};

export default CategoriesContent;
