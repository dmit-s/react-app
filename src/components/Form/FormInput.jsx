import styles from './FormInput.module.scss';

import { useState } from "react";

const FormInput = ({title, inputType, placeholder, error, initialValue, handleInput}) => {
    const [value, setValue] = useState(initialValue || '');

    const handleChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
    }
    

    return ( 
        <div className={styles.wrapper}>
            <label className={styles.title}>{title}</label>
            <input onInput={handleInput ? handleInput : undefined} className={styles.input} onChange={handleChange} type={inputType} value={value} placeholder={placeholder}/>
            <small className={styles.error}>{error}</small>
        </div>
     );
}
 
export default FormInput;