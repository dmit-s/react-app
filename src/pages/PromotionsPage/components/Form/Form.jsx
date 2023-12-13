import { useContext, useEffect, useState } from "react";
import Select from "../../../../components/Select/Select";
import styles from "../../../../styles/form.module.scss";
import PromotionsService from "../../../../services/PromotionsService";
import { PromotionsContext } from "../../context/PromotionsContext";

const initialState = {
  category: "",
  subcategory: "",
  brand: "",
  goods: "",
  cashback: "",
  checked: false,
};

const Form = ({ setShowModal, data }) => {
  const {
    state: { promotionsData },
    dispatch,
  } = useContext(PromotionsContext);

  const [formData, setFormData] = useState(
    data
      ? { ...data }
      : {
          ...initialState,
          id: crypto.randomUUID(),
        }
  );
  const [formErrors, setFormErrors] = useState({
    cashback: "",
    category: "",
    subcategory: "",
    brand: "",
  });
  const [dataForSelect, setDataForSelect] = useState({});
  const [activeSelect, setActiveSelect] = useState("");

  useEffect(() => {
    const { getCategories, getSubcategories, getBrands, getGoods } =
      PromotionsService;
    Promise.all([
      getCategories(),
      getSubcategories(),
      getBrands(),
      getGoods(),
    ]).then(([categories, subcategories, brands, goods]) => {
      setDataForSelect({ categories, subcategories, brands, goods });
    });
  }, []);

  const onRemove = (e) => {
    e.preventDefault();
    if(!data) return;
    dispatch({ type: "REMOVE_PROMOTION", payload: formData.id });
    setShowModal(false);
    document.body.classList.remove("show-bg");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors({
      cashback: "",
      category: "",
      subcategory: "",
      brand: "",
    });
    if (!validateForm()) return;
    const find = promotionsData.find((item) => item.id === formData.id);
    if (find) {
      dispatch({ type: "UPDATE_PROMOTION", payload: formData });
    } else {
      dispatch({
        type: "ADD_PROMOTION",
        payload: formData,
      });
    }

    setShowModal(false);
    document.body.classList.remove("show-bg");

    setFormData({
      ...initialState,
      id: crypto.randomUUID(),
    });
  };

  const changeActiveSelect = (type) => {
    setActiveSelect(type === activeSelect ? "" : type);
  };

  const changeFormData = (name, value) => {
    setFormData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      switch (key) {
        case "cashback":
          if (formData[key].trim().length === 0) {
            setFormErrors((prevState) => ({
              ...prevState,
              [key]: "This field is required",
            }));
            isValid = false;
          }
        case "category":
          if (formData[key].trim().length === 0) {
            setFormErrors((prevState) => ({
              ...prevState,
              [key]: "This field is required",
            }));
            isValid = false;
          }
        case "subcategory":
          if (formData[key].trim().length === 0) {
            setFormErrors((prevState) => ({
              ...prevState,
              [key]: "This field is required",
            }));
            isValid = false;
          }
        case "brand":
          if (formData[key].trim().length === 0) {
            setFormErrors((prevState) => ({
              ...prevState,
              [key]: "This field is required",
            }));
            isValid = false;
          }
      }
    });

    return isValid;
  };

  const handleChange = (e) => {
    changeFormData("cashback", e.target.value);
    if (e.target.value.length > 0) {
      setFormErrors({ ...formErrors, cashback: "" });
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.buttons}>
        <button onClick={onRemove} className={styles.removeBtn} type="button">
          Удалить
        </button>
        <button className={styles.saveBtn}>Сохранить</button>
      </div>
      <div className={styles.content}>
        <div className={styles.item}>
          <label>Начисление кешбека с покупки</label>
          <div className={styles.inputContainer}>
            <input
              type="text"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^\d]/g, ""))
              }
              onChange={handleChange}
              value={formData["cashback"]}
            />
          </div>
          <small style={{ color: "red" }}>{formErrors["cashback"]}</small>
        </div>
        <div className={styles.item}>
          <label>Категория</label>
          <Select
            className={styles.inputContainer}
            placeholder="Название категории"
            type="category"
            dataForSelect={dataForSelect.categories}
            setFormData={setFormData}
            formData={formData}
            activeSelect={activeSelect}
            changeActiveSelect={changeActiveSelect}
            changeFormData={changeFormData}
            currentValue={formData["category"]}
          />
          <small style={{ color: "red" }}>{formErrors["category"]}</small>
        </div>
        <div className={styles.item}>
          <label>Подкатегория</label>
          <Select
            className={styles.inputContainer}
            placeholder="Название подкатегории"
            type="subcategory"
            dataForSelect={dataForSelect.subcategories}
            setFormData={setFormData}
            formData={formData}
            activeSelect={activeSelect}
            changeActiveSelect={changeActiveSelect}
            changeFormData={changeFormData}
            currentValue={formData["subcategory"]}
          />
          <small style={{ color: "red" }}>{formErrors["subcategory"]}</small>
        </div>
        <div className={styles.item}>
          <label>Бренд</label>
          <Select
            className={styles.inputContainer}
            placeholder="Имя бренда"
            type="brand"
            dataForSelect={dataForSelect.brands}
            setFormData={setFormData}
            formData={formData}
            activeSelect={activeSelect}
            changeActiveSelect={changeActiveSelect}
            changeFormData={changeFormData}
            currentValue={formData["brand"]}
          />
          <small style={{ color: "red" }}>{formErrors["brand"]}</small>
        </div>
      </div>
    </form>
  );
};

export default Form;
