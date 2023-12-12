import { useContext, useEffect, useState } from "react";
import Select from "../../../../components/Select/Select";
import styles from "../../../../styles/form.module.scss";
import PromotionsService from "../../../../services/PromotionsService";
import { PromotionsContext } from "../../context/PromotionsContext";

const initialState = {
  id: crypto.randomUUID(),
  category: "",
  subcategory: "",
  brand: "",
  goods: "",
  cashback: "",
  checked: false,
};

const Form = ({ promotionData }) => {
  const {
    state: { promotionsData },
    dispatch,
  } = useContext(PromotionsContext);

  const [formData, setFormData] = useState(promotionData || initialState);
  const [data, setData] = useState({});
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
      setData({ categories, subcategories, brands, goods });
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData(initialState);
    const find = promotionsData.find((item) => item.id === formData.id);
    if (find) {
      console.log("find");
      dispatch({ type: "UPDATE_PROMOTION", payload: formData });
    } else {
      dispatch({ type: "ADD_PROMOTION", payload: formData });
    }
    console.log(formData, promotionsData);
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
              onChange={(e) => changeFormData("cashback", e.target.value)}
              value={formData['cashback']}
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
