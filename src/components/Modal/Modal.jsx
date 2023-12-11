import styles from "./Modal.module.scss";

const Modal = ({ shouldShow, onRemove, onSave, children, data }) => {
  return shouldShow && <div className={styles.wrapper}>{children}</div>;
};

export default Modal;
