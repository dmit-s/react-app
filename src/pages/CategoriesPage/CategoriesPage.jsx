import Header from "../../components/Header/Header";
import CategoriesContent from "./components/CategoriesContent/CategoriesContent";
import { CategoriesContextProvider } from "./context/CategoriesContext";

const CategoriesPage = () => {
  return (
    <CategoriesContextProvider>
      <Header />
      <CategoriesContent />
    </CategoriesContextProvider>
  );
};

export default CategoriesPage;
