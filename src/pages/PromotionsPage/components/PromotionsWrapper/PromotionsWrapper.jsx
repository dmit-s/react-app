import { useContext, useEffect, useState } from "react";
import styles from "./PromotionsWrapper.module.scss";
import PromotionsService from "../../../../services/PromotionsService";
import { PromotionsContext } from "../../context/PromotionsContext";

const PromotionsWrapper = ({ children }) => {
  const {
    state: { promotionsData, status },
    dispatch,
  } = useContext(PromotionsContext);

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

  return (
    <>
      <div className={styles.wrapper}>{status === "received" && children}</div>
    </>
  );
};

export default PromotionsWrapper;
