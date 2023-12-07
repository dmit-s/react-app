import PromotionsTop from "./components/PromotionsTop/PromotionsTop";
import PromotionsTable from "./components/PromotionsTable/PromotionsTable";
import PromotionsRemove from "./components/PromotionsRemove/PromotionsRemove";
import PromotionsWrapper from "./components/PromotionsWrapper/PromotionsWrapper";
import PromotionsContextProvider from "./context/PromotionsContext";

const PromotionsPage = () => {
  return (
    <PromotionsContextProvider>
      <PromotionsWrapper>
        <PromotionsTop />
        <PromotionsTable />
        <PromotionsRemove />
      </PromotionsWrapper>
    </PromotionsContextProvider>
  );
};

export default PromotionsPage;
