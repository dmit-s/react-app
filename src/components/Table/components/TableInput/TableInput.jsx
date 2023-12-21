import styles from './TableInput.module.scss';

const TableInput = ({placeholder}) => {
    return ( 
        <input className={styles.wrapper} type="text" placeholder={placeholder}/>
     );
}
 
export default TableInput;