import styles from "./Form.module.scss";

const Form = ({ children, onSubmit, buttons }) => {
  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      {buttons && (
        <div className={styles.buttonsWrapper}>
          {buttons}
        </div>
      )}

      <div className={styles.content}>{children}</div>
    </form>
  );
};

export default Form;
