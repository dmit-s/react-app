import { useContext, useEffect, useState } from "react";
import PromotionsService from "../../../../services/PromotionsService";
import { PromotionsContext } from "../../context/PromotionsContext";
import PromotionsTop from "../PromotionsTop/PromotionsTop";
import Modal from "../../../../components/Modal/Modal";
import Form from "../../../../components/Form/Form";
import Table from "../../../../components/Table/Table";
import FormInput from "../../../../components/Form/components/FormInput/FormInput";
import FormSelect from "../../../../components/Form/components/FormSelect/FormSelect";
import { formatToTableData } from "../../../../helpers/formatToTableData";

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
    state: { promotionsData, status, showItems, currentPage },
    dispatch,
  } = useContext(PromotionsContext);

  const [showModal, setShowModal] = useState(false);

  // form
  const [formData, setFormData] = useState(getFormDataInitialState());
  const [activeSelect, setActiveSelect] = useState("");
  const [dataForSelect, setDataForSelect] = useState([]);
  const [formErrors, setFormErrors] = useState(gerFormErrorsInitialState());

  // table
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(() => {
      const formattedData = promotionsData.map((item) => {
        const obj = { ...item };
        obj.cashback = `${obj.cashback}%`;
        return obj;
      });

      return formatToTableData(formattedData, ["id"]);
    });
  }, [promotionsData]);

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

  const handleRemove = (checkedItems) => {
    const filteredArr = promotionsData.filter(
      (item) => checkedItems.indexOf(item.id) === -1
    );
    dispatch({ type: "SET_PROMOTIONS", payload: filteredArr });
  };

  const getFormButtons = () => {
    const buttonsData = [
      {
        className: "outline-btn",
        text: "Удалить",
        onRemove,
      },
      {
        className: "purple-btn",
        text: "Сохранить",
        onSubmit,
      },
    ];

    return buttonsData.map(({ text, className, handleClick }) => (
      <button onClick={handleClick} className={className}>
        {text}
      </button>
    ));
  };

  return (
    <>
      <div>
        {status === "received" && (
          <>
            <PromotionsTop openModal={openModal} />
            <Table
              adding={true}
              selectable={true}
              handleAddItem={openModal}
              handleRemove={handleRemove}
              data={tableData}
              showItems={showItems}
              currentPage={currentPage}
              filters={true}
              headers={{
                category: "Категория",
                subcategory: "Подкатегория",
                brand: "Бренд",
                goods: "Товары",
                cashback: "Кешбек",
              }}
            />
            <Modal shouldShow={showModal} setShowModal={setShowModal}>
              <Form
                onSubmit={onSubmit}
                onRemove={onRemove}
                buttons={getFormButtons()}
              >
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
