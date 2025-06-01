import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home";
import CategoryPage from "@/pages/category";
import ProductDetailPage from "@/pages/productDetail";
import OrderCreatePage from "@/pages/order/create";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/order/:id" element={<OrderCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
