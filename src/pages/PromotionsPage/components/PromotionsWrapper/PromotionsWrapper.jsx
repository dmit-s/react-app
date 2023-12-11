import { useContext, useEffect, useState } from "react";
import styles from "./PromotionsWrapper.module.scss";
import PromotionsService from "../../../../services/PromotionsService";
import { PromotionsContext } from "../../context/PromotionsContext";
import Modal from "../../../../components/Modal/Modal";
import modalStyles from "../../../../components/Modal/Modal.module.scss";
import Select from "../../../../components/Select/Select";

const PromotionsWrapper = ({ children }) => {
  const {
    state: { promotionsData, status },
    dispatch,
  } = useContext(PromotionsContext);
  const [showModal, setShowModal] = useState(true);
  const [dataForModal, setDataForModal] = useState([]);
  const [selectActive, setSelectActive] = useState("");

  const onRemove = () => {
    console.log("remove");
  };

  const onSave = () => {
    console.log("save");
  };

  useEffect(() => {
    PromotionsService.getPromotions()
      .then((data) => {
        dispatch({ type: "SET_PROMOTIONS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "SET_ERROR", payload: err });
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (showModal) {
      const { getCategories, getSubcategories, getBrands, getGoods } =
        PromotionsService;
      Promise.all([
        getCategories(),
        getSubcategories(),
        getBrands(),
        getGoods(),
      ]).then(([categories, subcategories, brands, goods]) => {
        setDataForModal({ categories, subcategories, brands, goods });
      });
      document.body.classList.add("show-bg");
    } else {
      document.body.classList.remove("show-bg");
    }
  }, [showModal]);

  console.log(dataForModal);

  return (
    <>
      <div className={styles.wrapper}>{status === "received" && children}</div>
      <Modal
        onSave={onSave}
        onRemove={onRemove}
        shouldShow={showModal}
        data={dataForModal}
      >
        <div className={modalStyles.buttons}>
          <button onClick={onRemove} className={modalStyles.removeBtn}>
            Удалить
          </button>
          <button onClick={onSave} className={modalStyles.saveBtn}>
            Сохранить
          </button>
        </div>

        <div className={modalStyles.content}>
          <div className={modalStyles.item}>
            <span>Начисление кешбека с покупки</span>
            <div className={modalStyles.inputContainer}>
              <input type="text" />
            </div>
          </div>
          {Object.keys(dataForModal).map((k) => {
            const title = () => {
              switch (k) {
                case "categories":
                  return "Категория";
                case "subcategories":
                  return "Подкатегория";
                case "brands":
                  return "Бренды";
                case "goods":
                  return "Товары";
              }
            };

            return (
              <div className={modalStyles.item}>
                <span>{title()}</span>
                <Select
                  initialValue={k}
                  data={dataForModal[k]}
                  className={modalStyles.inputContainer}
                  type={k}
                  setSelectActive={setSelectActive}
                  selectActive={selectActive}
                />
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default PromotionsWrapper;
