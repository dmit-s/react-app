const Modal = ({ shouldShow, onClose, children }) => {
  return shouldShow && <div className={styles.wrapper}>{children}</div>;
};

export default Modal;
