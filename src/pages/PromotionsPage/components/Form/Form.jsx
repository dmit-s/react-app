import Select from "../../../../components/Select/Select";

const Form = () => {
  return (
    <form>
      <div className={styles.formItem}>
        <label>Начисление кешбека с покупки</label>
        <div className={styles.currentValue}>
          <input type="text" />
        </div>
      </div>
      <div className={styles.formItem}>
        <label>Категория</label>
        <Select className={styles.curr} />
      </div>
      <div className={styles.formItem}>
        <label>Подкатегория</label>
        <Select />
      </div>
      <div className={styles.formItem}>
        <label>Начисление кешбека с покупки</label>
        <Select />
      </div>
      <div className={styles.formItem}>
        <label>Начисление кешбека с покупки</label>
        <Select />
      </div>
    </form>
  );
};

export default Form;
