import { useContext, useEffect, useState } from "react";
import styles from "./PromotionsWrapper.module.scss";
import PromotionsService from "../../../../services/PromotionsService";
import { PromotionsContext } from "../../context/PromotionsContext";
import PromotionsTable from "../PromotionsTable/PromotionsTable";
import PromotionsRemove from "../PromotionsRemove/PromotionsRemove";
import PromotionsTop from "../PromotionsTop/PromotionsTop";
import Modal from "../../../../components/Modal/Modal";
import Form from "../Form/Form";

const PromotionsWrapper = () => {
  const {
    state: { promotionsData, status },
    dispatch,
  } = useContext(PromotionsContext);

  const [showModal, setShowModal] = useState(false);
  const [dataForModal, setDataForModal] = useState(null);

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
      document.body.classList.add("show-bg");
    }
  }, [showModal]);

  const openModal = (e, id) => {
    e.stopPropagation();
    setShowModal(true);
    if (id) {
      setDataForModal({...promotionsData.find((item) => item.id === id)});
    } else {
      setDataForModal(null);
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
              <Form showModal={showModal} setShowModal={setShowModal} data={dataForModal} />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default PromotionsWrapper;
