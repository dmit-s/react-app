import styles from "./Modal.module.scss";

const Modal = ({ shouldShow, children }) => {
  return shouldShow && <div className={styles.wrapper}>{children}</div>;
};

export default Modal;
