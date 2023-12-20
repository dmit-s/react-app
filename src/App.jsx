import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// pages
import PromotionsPage from "./pages/PromotionsPage/PromotionsPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<PromotionsPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
