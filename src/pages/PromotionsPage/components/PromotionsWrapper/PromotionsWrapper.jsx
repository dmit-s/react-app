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

const getFormDataInitialState = () => ({
  id: crypto.randomUUID(),
  category: "",
  subcategory: "",
  brand: "",
  goods: "",
  cashback: "",
  checked: false,
});

const gerFormErrorsInitialState = () => ({
  cashback: "",
  category: "",
  subcategory: "",
  brand: "",
});

const PromotionsWrapper = () => {
  const {
    state: { promotionsData, status },
    dispatch,
  } = useContext(PromotionsContext);

  const [showModal, setShowModal] = useState(false);

  // form
  const [formData, setFormData] = useState(getFormDataInitialState());
  const [activeSelect, setActiveSelect] = useState("");
  const [dataForSelect, setDataForSelect] = useState([]);
  const [formErrors, setFormErrors] = useState(gerFormErrorsInitialState());

  useEffect(() => {
    PromotionsService.getPromotions()
      .then((data) => {
        dispatch({ type: "SET_PROMOTIONS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "SET_ERROR", payload: err });
        console.error(err);
      });

    const { getCategories, getSubcategories, getBrands } = PromotionsService;
    Promise.all([getCategories(), getSubcategories(), getBrands()]).then(
      ([categories, subcategories, brands]) => {
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
      }
    );
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("show-bg");
    } else {
      setFormErrors(gerFormErrorsInitialState());
    }
  }, [showModal]);

  const openModal = (e, id) => {
    e.stopPropagation();
    setShowModal(true);
    if (id) {
      setFormData({ ...promotionsData.find((item) => item.id === id) });
    } else {
      setFormData(getFormDataInitialState());
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

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

  const validateForm = () => {
    let isValid = true;
    for (let key of Object.keys(formErrors)) {
      if (formData[key].trim().length === 0) {
        setFormErrors((prevState) => ({
          ...prevState,
          [key]: "This field is required",
        }));
        isValid = false;
      }
    }
    return isValid;
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setFormErrors({ ...formErrors, [key]: "" });
  };

  const onRemove = () => {
    const find = promotionsData.find((item) => item.id === formData.id);
    if (find) {
      dispatch({ type: "REMOVE_PROMOTION", payload: formData.id });
      setShowModal(false);
      document.body.classList.remove("show-bg");
    } else {
      setFormData(getFormDataInitialState());
      setFormErrors(gerFormErrorsInitialState());
    }
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
              <Form onSubmit={onSubmit} onRemove={onRemove}>
                <FormInput
                  title="Начисление кешбека с покупки"
                  name="cashback"
                  inputType="text"
                  placeholder="%"
                  value={formData["cashback"]}
                  error={formErrors["cashback"]}
                  handleInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^\d]/g, ""))
                  }
                  updateFormData={updateFormData}
                />
                {Object.entries(dataForSelect).map(([key, value]) => (
                  <FormSelect
                    key={key}
                    title={value.title}
                    name={key}
                    value={formData[key]}
                    activeSelect={activeSelect}
                    placeholder={value.placeholder}
                    error={formErrors[key]}
                    toggleSelect={toggleSelect}
                    optionsData={value.data}
                    updateFormData={updateFormData}
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
