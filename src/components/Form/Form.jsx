import styles from './Form.module.scss'

const Form = ({children, onSubmit, onRemove}) => {
  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        <button onClick={onRemove} className={styles.removeBtn} type="button">
          Удалить
        </button>
        <button className={styles.submitBtn}>Сохранить</button>
      </div>
      <div className={styles.content}>{children}</div>
    </form>
  );
};

export default Form;