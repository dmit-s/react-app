import SvgIcon from "../SvgIcon/SvgIcon";

const Form = () => {
  return (
    <form>
      <div className={styles.formItem}>
        <label>Описание*</label>
        <div className={styles.currentValue}>
          <input type="text" />
          <SvgIcon iconName="chevron-down" />
        </div>
      </div>
    </form>
  );
};

export default Form;
