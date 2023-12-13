import { useEffect, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import styles from "./Modal.module.scss";

const Modal = ({ shouldShow, children, setShowModal }) => {
  const [closing, setClosing] = useState(false);

  const onClickOutside = () => {
    setClosing(true);
    document.body.classList.remove("show-bg");

    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 400);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClickOutside();
      }
    };

    document.addEventListener("keyup", handleKey);
    return () => {
      document.removeEventListener("keyup", handleKey);
    };
  }, []);

  useEffect(() => {
    if (closing) {
      document.body.classList.remove("show-bg");
    }
  }, [closing]);

  const ref = useOutsideClick(onClickOutside);

  return (
    shouldShow && (
      <div ref={ref} className={`${styles.wrapper} ${!closing && styles.show}`}>
        {children}
      </div>
    )
  );
};

export default Modal;
