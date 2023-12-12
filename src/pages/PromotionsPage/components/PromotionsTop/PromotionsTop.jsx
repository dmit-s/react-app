import { useContext, useEffect, useState } from "react";
import Filters from "../../../../components/Filters/Filters";
import styles from "./PromotionsTop.module.scss";
import { PromotionsContext } from "../../context/PromotionsContext";
import Modal from "../../../../components/Modal/Modal";
import Form from "../Form/Form";

const PromotionsTop = () => {
  const {
    state: { promotionsData },
  } = useContext(PromotionsContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("show-bg");
    } else {
      document.body.classList.remove("show-bg");
    }
  }, [showModal]);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <Filters data={promotionsData} />
      <button onClick={openModal} className={styles.addBtn}>Добавить акцию</button>

      <Modal shouldShow={showModal}>
        <Form />
      </Modal>
    </div>
  );
};

export default PromotionsTop;
