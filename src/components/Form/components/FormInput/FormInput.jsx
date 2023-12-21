import styles from "./FormInput.module.scss";

const FormInput = ({
  title,
  name,
  value,
  inputType,
  placeholder,
  error,
  handleInput,
  updateFormData,
}) => {
  const handleChange = (e) => {
    updateFormData(name, e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.title}>{title}</label>
      <input
        onInput={handleInput ? handleInput : undefined}
        className={styles.input}
        onChange={handleChange}
        type={inputType}
        value={value}
        placeholder={placeholder}
        name={name}
      />
      <small className={styles.error}>{error}</small>
    </div>
  );
};

export default FormInput;
