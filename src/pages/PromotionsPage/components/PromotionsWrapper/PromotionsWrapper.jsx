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
        setDataForModal([categories, subcategories, brands, goods]);
      });
      document.body.classList.add("show-bg");
    } else {
      document.body.classList.remove("show-bg");
    }
  }, [showModal]);

  return (
    <>
      <div className={styles.wrapper}>{status === "received" && children}</div>
      <Modal shouldShow={showModal} data={dataForModal}>
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
          <div className={modalStyles.item}>
            <span>Категория</span>
            <Select
              initialValue="EFEWF"
              data={dataForModal[0]}
              className={modalStyles.inputContainer}
              type="categories"
              setSelectActive={setSelectActive}
              selectActive={selectActive}
            />
          </div>
          <div className={modalStyles.item}>
            <span>Подкатегория</span>
            <Select
              initialValue="EFEWF"
              data={dataForModal[1]}
              className={modalStyles.inputContainer}
              type="subcategories"
              setSelectActive={setSelectActive}
              selectActive={selectActive}
            />
          </div>
          <div className={modalStyles.item}>
            <span>Бренд</span>
            <Select
              initialValue="EFEWF"
              data={dataForModal[2]}
              className={modalStyles.inputContainer}
              type="brands"
              setSelectActive={setSelectActive}
              selectActive={selectActive}
            />
          </div>
          <div className={modalStyles.item}>
            <span>Товары</span>
            <Select
              initialValue="EFEWF"
              data={dataForModal[3]}
              className={modalStyles.inputContainer}
              type="goods"
              setSelectActive={setSelectActive}
              selectActive={selectActive}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PromotionsWrapper;
