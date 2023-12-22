import styles from "./FormInput.module.scss";

const FormInput = ({
  title,
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
      {title && (
        <label className={styles.title}>{title}</label>
      )}
      
      <input
        onInput={handleInput ? handleInput : undefined}
        className={styles.input}
        onChange={handleChange}
        type={inputType}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
      />
      
      {error && (
        <small className={styles.error}>{error}</small>
      )}
      
    </div>
  );
};

export default FormInput;
