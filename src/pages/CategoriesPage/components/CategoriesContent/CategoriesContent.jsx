import styles from "./CategoriesContent.module.scss";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import Table from "../../../../components/Table/Table";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import CategoriesService from "../../../../services/CategoriesService";
import { formatToTableData } from "../../../../helpers/formatToTableData";
import Form from "../../../../components/Form/Form";
import FormInput from "../../../../components/Form/components/FormInput/FormInput";

const CategoriesContent = () => {
  const {
    state: { categoriesData },
    dispatch,
  } = useContext(CategoriesContext);
  const [categoriesTableData, setCategoriesTableData] = useState([]);
  const [subcategoriesTableData, setSubcategoriesTableData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [subcategoryInputValue, setSubcategoryInputValue] = useState("");

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
        formatToTableData(findCategory.subcategories, ["id"], {
          removable: true,
          editable: true,
        })
      );
    } else {
      setSubcategoriesTableData([]);
    }
  }, [activeCategory, categoriesData]);

  useEffect(() => {
    CategoriesService.getCategories().then((data) =>
      dispatch({ type: "SET_CATEGORIES", payload: data })
    );
  }, []);

  const handleClick = (e, id) => {
    setActiveCategory(id);
  };

  const removeCategory = (id) => {
    dispatch({ type: "REMOVE_CATEGORY", payload: id });
  };

  const addCategory = (item) => {
    dispatch({ type: "ADD_CATEGORY", payload: item });
  };

  const editCategory = (id, value) => {
    const category = categoriesData.find((item) => item.id === id);
    const updatedCategory = { ...category, name: value };
    dispatch({ type: "UPDATE_CATEGORY", payload: updatedCategory });
  };

  const onSubmitCategory = (e) => {
    e.preventDefault();
    addCategory({
      id: crypto.randomUUID(),
      name: categoryInputValue,
      subcategories: [],
    });
  };

  const onSubmitSubcategory = () => {
    e.preventDefault();
    addCategory({
      id: crypto.randomUUID(),
      name: categoryInputValue,
      subcategories: [],
    });
  }

  const updateCategoryFormData = (_, value) => {
    setCategoryInputValue(value);
  };

  const updateSubcategoryFormData = (_, value) => {
    setSubcategoryInputValue(value);
  };

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={onSubmit}>
        <FormInput
          updateFormData={updateCategoryFormData}
          placeholder="Введите название категории"
          name="category"
          value={categoryInputValue}
        />
        <button className="purple-btn">Добавить категорию</button>

        <Table
          data={categoriesTableData}
          headers={{ name: "Название категории" }}
          handleAddItem={handleClick}
          handleRemove={removeCategory}
          editItem={editCategory}
          nothingFoundMessage="Здесь пока нет категорий"
          adding
        />
      </Form>

      <SvgIcon iconName="two-chevron-right" />
      <Form>
        <FormInput
          updateFormData={updateSubcategoryFormData}
          placeholder="Введите название подкатегории"
          value={subcategoryInputValue}
        />
        <button className="purple-btn">Добавить подкатегорию</button>

        <Table
          data={subcategoriesTableData}
          headers={{ name: "Название подкатегории" }}
          nothingFoundMessage={
            categoriesTableData.length
              ? "Здесь пока нет подкатегорий"
              : "Выберите категорию"
          }
        />
      </Form>
    </div>
  );
};

export default CategoriesContent;
