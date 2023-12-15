import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// pages
import PromotionsPage from "./pages/PromotionsPage/PromotionsPage";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// pages

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PromotionsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>

      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
