import styles from "./Modal.module.scss";

const Modal = ({ shouldShow, onRemove, onSave, children, Buttons, data }) => {

  console.log(children);
  return (
    shouldShow && (
      <div className={styles.wrapper}>
        {children}
      </div>
    )
  );
};

export default Modal;
