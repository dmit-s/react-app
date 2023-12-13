import PromotionsWrapper from "./components/PromotionsWrapper/PromotionsWrapper";
import PromotionsContextProvider from "./context/PromotionsContext";

const PromotionsPage = () => {
  return (
    <PromotionsContextProvider>
      <PromotionsWrapper />
    </PromotionsContextProvider>
  );
};

export default PromotionsPage;
