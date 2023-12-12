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

const Form = ({ promotionData, setShowModal }) => {
  const {
    state: { promotionsData },
    dispatch,
  } = useContext(PromotionsContext);

  const [formData, setFormData] = useState(
    promotionData || {
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
  const [data, setData] = useState({});
  const [activeSelect, setActiveSelect] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const { getCategories, getSubcategories, getBrands, getGoods } =
      PromotionsService;
    Promise.all([
      getCategories(),
      getSubcategories(),
      getBrands(),
      getGoods(),
    ]).then(([categories, subcategories, brands, goods]) => {
      setData({ categories, subcategories, brands, goods });
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    validateForm();
    if (!formIsValid) return;

    const find = promotionsData.find((item) => item.id === formData.id);
    if (find) {
      dispatch({ type: "UPDATE_PROMOTION", payload: formData });
    } else {
      const obj = {};

      Object.keys(formData).forEach((key) => {
        if (
          typeof formData[key] === "string" &&
          formData[key].trim().length === 0
        ) {
          obj[key] = "-";
        } else if (key === "brand") {
          obj[key] = `${formData[key]}%`;
        } else {
          obj[key] = formData[key];
        }
      });

      dispatch({
        type: "ADD_PROMOTION",
        payload: obj,
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
  };

  console.log(formErrors);

  const validateForm = () => {
    Object.keys(formData).forEach((key) => {
      

      switch (key) {
       
        case "cashback":
          if (formData[key].trim().length === 0) {
            setFormErrors((prevState) => ({...prevState, [key]: "This field is required"}));
            setFormIsValid(false);
          }
        case "category":
          if (formData[key].trim().length === 0) {
            setFormErrors((prevState) => ({...prevState, [key]: "This field is required"}));
            setFormIsValid(false);
          }
        case "subcategory":
          console.log(key);
          if (formData[key].trim().length === 0) {
            setFormErrors((prevState) => ({...prevState, [key]: "This field is required"}));
            setFormIsValid(false);
          }
        case "brand":
          if (formData[key].trim().length === 0) {
            setFormErrors((prevState) => ({...prevState, [key]: "This field is required"}));
            setFormIsValid(false);
          }
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.buttons}>
        <button className={styles.removeBtn}>Удалить</button>
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
              onChange={(e) => changeFormData("cashback", e.target.value)}
              value={formData["cashback"]}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label>Категория</label>
          <Select
            className={styles.inputContainer}
            placeholder="Название категории"
            type="category"
            data={data.categories}
            setFormData={setFormData}
            formData={formData}
            activeSelect={activeSelect}
            changeActiveSelect={changeActiveSelect}
            changeFormData={changeFormData}
            currentValue={formData["category"]}
          />
        </div>
        <div className={styles.item}>
          <label>Подкатегория</label>
          <Select
            className={styles.inputContainer}
            placeholder="Название подкатегории"
            type="subcategory"
            data={data.subcategories}
            setFormData={setFormData}
            formData={formData}
            activeSelect={activeSelect}
            changeActiveSelect={changeActiveSelect}
            changeFormData={changeFormData}
            currentValue={formData["subcategory"]}
          />
        </div>
        <div className={styles.item}>
          <label>Бренд</label>

          <Select
            className={styles.inputContainer}
            placeholder="Имя бренда"
            type="brand"
            data={data.brands}
            setFormData={setFormData}
            formData={formData}
            activeSelect={activeSelect}
            changeActiveSelect={changeActiveSelect}
            changeFormData={changeFormData}
            currentValue={formData["brand"]}
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
