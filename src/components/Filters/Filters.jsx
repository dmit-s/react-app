import styles from './Filters.module.scss';

const Filters = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Filters;