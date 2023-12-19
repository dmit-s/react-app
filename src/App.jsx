import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// pages
import PromotionsPage from "./pages/PromotionsPage/PromotionsPage";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import Login from "./pages/Login/Login";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";

// pages

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PromotionsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Route>

      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
