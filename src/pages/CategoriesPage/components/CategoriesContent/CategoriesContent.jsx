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
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [subcategoryInputValue, setSubcategoryInputValue] = useState("");
  const [formsErrors, setFormsErrors] = useState({
    category: null,
    subcategory: null,
  });

  useEffect(() => {
    setCategoriesTableData(
      formatToTableData(categoriesData, ["id", "subcategories"], {
        removable: true,
        editable: true,
      })
    );

    if (categoriesData.length === 0) {
      setFormsErrors({ ...formsErrors, subcategory: null });
    }
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

  // set active
  const handleClick = (e, id) => {
    setActiveCategory(id);
  };

  // remove
  const removeCategory = (id) => {
    dispatch({ type: "REMOVE_CATEGORY", payload: id });
    if (activeCategory === id) {
      setActiveCategory("");
    }
  };

  const removeSubcategory = (subcategoryId) => {
    dispatch({
      type: "REMOVE_SUBCATEGORY",
      payload: { categoryId: activeCategory, subcategoryId },
    });
  };

  // add
  const addCategory = (item) => {
    dispatch({ type: "ADD_CATEGORY", payload: item });
  };

  const addSubcategory = (categoryId, item) => {
    console.log(item);
    dispatch({ type: "ADD_SUBCATEGORY", payload: { categoryId, item } });
  };

  // edit
  const editCategory = (id, value) => {
    const category = categoriesData.find((item) => item.id === id);
    const updatedCategory = { ...category, name: value };

    dispatch({ type: "UPDATE_CATEGORY", payload: updatedCategory });
  };

  const editSubcategory = (id, value) => {
    const updatedCategory = categoriesData.map((categoryItem) => {
      if (categoryItem.id === activeCategory) {
        categoryItem.subcategories = categoryItem.subcategories.map(
          (subcategoryItem) =>
            subcategoryItem.id === id
              ? { ...subcategoryItem, name: value }
              : subcategoryItem
        );
      }

      return categoryItem;
    });
    dispatch({ type: "UPDATE_CATEGORY", payload: updatedCategory });
  };

  // onSubmit
  const onSubmitCategory = (e) => {
    e.preventDefault();

    if (!categoryInputValue.length) {
      if (!subcategoryInputValue.length) {
        setFormsErrors({ ...formsErrors, category: "Введите что-то" });
      }
      return;
    }

    addCategory({
      id: crypto.randomUUID(),
      name: categoryInputValue,
      subcategories: [],
    });

    setFormsErrors({ ...formsErrors, category: null });
    setCategoryInputValue("");
  };

  const onSubmitSubcategory = (e) => {
    e.preventDefault();
    if (!subcategoryInputValue.length) {
      setFormsErrors({ ...formsErrors, subcategory: "Введите что-то" });
      return;
    }

    addSubcategory(activeCategory, {
      id: crypto.randomUUID(),
      name: subcategoryInputValue,
    });

    setFormsErrors({ ...formsErrors, subcategory: null });
    setSubcategoryInputValue("");
  };

  // updateInputsValue
  const updateCategoryFormData = (_, value) => {
    setCategoryInputValue(value);
  };

  const updateSubcategoryFormData = (_, value) => {
    setSubcategoryInputValue(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        <Form onSubmit={onSubmitCategory}>
          <FormInput
            updateFormData={updateCategoryFormData}
            placeholder="Введите название категории"
            value={categoryInputValue}
            error={formsErrors.category}
          />
          <button className="purple-btn">Добавить категорию</button>
        </Form>
        <Table
          data={categoriesTableData}
          headers={{ name: "Название категории" }}
          handleAddItem={handleClick}
          handleRemove={removeCategory}
          editItem={editCategory}
          nothingFoundMessage="Здесь пока нет категорий"
          tabPanel={true}
        />
      </div>
      <SvgIcon iconName="two-chevron-right" />
      <div className={styles.column}>
        {activeCategory && categoriesData.length > 0 ? (
          <>
            <Form onSubmit={onSubmitSubcategory}>
              <FormInput
                updateFormData={updateSubcategoryFormData}
                placeholder="Введите название подкатегории"
                value={subcategoryInputValue}
                error={formsErrors.subcategory}
              />
              <button className="purple-btn">Добавить подкатегорию</button>
            </Form>
            <Table
              data={subcategoriesTableData}
              headers={{ name: "Название подкатегории" }}
              nothingFoundMessage={
                categoriesTableData.length
                  ? "Здесь пока нет подкатегорий"
                  : "Выберите категорию"
              }
              editItem={editSubcategory}
              handleRemove={removeSubcategory}
            />
          </>
        ) : (
          <div className={styles.messageContainer}>
            <span>Выберите категорию</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesContent;
