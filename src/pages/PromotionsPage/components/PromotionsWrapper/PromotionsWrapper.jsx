import { useContext, useEffect, useState } from "react";
import styles from "./PromotionsWrapper.module.scss";
import PromotionsService from "../../../../services/PromotionsService";
import { PromotionsContext } from "../../context/PromotionsContext";
import PromotionsTable from "../PromotionsTable/PromotionsTable";
import PromotionsRemove from "../PromotionsRemove/PromotionsRemove";
import PromotionsTop from "../PromotionsTop/PromotionsTop";
import Modal from "../../../../components/Modal/Modal";
import FormInput from "../../../../components/Form/FormInput";
import Form from "../../../../components/Form/Form";
import FormSelect from "../../../../components/Form/FormSelect";

const getFormDataInitialState = () => {
  return {
    id: crypto.randomUUID(),
    category: "",
    subcategory: "",
    brand: "",
    goods: "",
    cashback: "",
    checked: false,
  };
};

const PromotionsWrapper = () => {
  const {
    state: { promotionsData, status },
    dispatch,
  } = useContext(PromotionsContext);

  const [showModal, setShowModal] = useState(false);

  // form
  const [formData, setFormData] = useState({...getFormDataInitialState()});
  const [activeSelect, setActiveSelect] = useState("");
  const [dataForSelect, setDataForSelect] = useState([]);

  console.log(formData);

  useEffect(() => {
    PromotionsService.getPromotions()
      .then((data) => {
        dispatch({ type: "SET_PROMOTIONS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "SET_ERROR", payload: err });
        console.error(err);
      });

    const { getCategories, getSubcategories, getBrands, getGoods } =
      PromotionsService;
    Promise.all([
      getCategories(),
      getSubcategories(),
      getBrands(),
      getGoods(),
    ]).then(([categories, subcategories, brands, goods]) => {
      setDataForSelect({
        category: {
          title: "Категория",
          placeholder: "Название категории",
          data: [...categories],
        },
        subcategory: {
          title: "Подкатегория",
          placeholder: "Название подкатегории",
          data: [...subcategories],
        },
        brand: {
          title: "Бренд",
          placeholder: "Имя бренда",
          data: [...brands],
        },
      });
    });
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("show-bg");
    }
  }, [showModal]);

  const openModal = (e, id) => {
    e.stopPropagation();
    setShowModal(true);
    if (id) {
      setFormData({ ...promotionsData.find((item) => item.id === id) });
    } else {
      setFormData(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const find = promotionsData.find((item) => item.id === formData.id);

    if (find) {
      dispatch({ type: "UPDATE_PROMOTION", payload: formData });
    } else {
      dispatch({
        type: "ADD_PROMOTION",
        payload: formData,
      });
    }

    setFormData(getFormDataInitialState());

    setShowModal(false);
    document.body.classList.remove("show-bg");
  };

  const toggleSelect = (selectName) => {
    setActiveSelect(activeSelect === selectName ? "" : selectName);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {status === "received" && (
          <>
            <PromotionsTop openModal={openModal} />
            <PromotionsTable openModal={openModal} />
            <PromotionsRemove />

            <Modal shouldShow={showModal} setShowModal={setShowModal}>
              <Form onSubmit={onSubmit}>
                <FormInput
                  title="Начисление кешбека с покупки"
                  inputType="text"
                  placeholder="20%"
                  initialValue="hello"
                  error="This field is required"
                  handleInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^\d]/g, ""))
                  }
                />
                {Object.entries(dataForSelect).map(([key, value]) => (
                  <FormSelect
                    key={key}
                    title={value.title}
                    name={key}
                    activeSelect={activeSelect}
                    placeholder={value.placeholder}
                    error="This field is required"
                    toggleSelect={toggleSelect}
                  />
                ))}
              </Form>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default PromotionsWrapper;
