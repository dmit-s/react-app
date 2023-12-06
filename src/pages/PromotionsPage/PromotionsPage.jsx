import PromotionsTop from "./components/PromotionsTop/PromotionsTop";
import PromotionsTable from "./components/PromotionsTable/PromotionsTable";
import PromotionsRemove from "./components/PromotionsRemove/PromotionsRemove";
import styles from './PromotionsPage.module.scss';

const PromotionsPage = () => {
  return (
    <div className={styles.wrapper}>
      <PromotionsTop />
      <PromotionsTable />
      <PromotionsRemove/>
    </div>
  );
};

export default PromotionsPage;
