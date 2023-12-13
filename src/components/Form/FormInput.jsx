import { useState } from "react";

const FormInput = ({title, inputType, placeholder, error}) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    return ( 
        <div>
            <label>{title}</label>
            <input onChange={handleChange} type={inputType} value={value} placeholder={placeholder}></input>
            <small>{error}</small>
        </div>
     );
}
 
export default FormInput;