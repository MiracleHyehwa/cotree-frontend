import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/home";
import CategoryPage from "@/pages/category";
import ProductDetailPage from "@/pages/productDetail";
import OrderHistoryPage from "@/pages/order";
import OrderCreatePage from "@/pages/order/create";
import OrderCompletedPage from "@/pages/order/complete";
import ShoppingCartPage from "@/pages/shoppingCart";
import MyPage from "@/pages/mypage";
import PointHistoryPage from "@/pages/mypage/points";
import RewardHistoryPage from "@/pages/mypage/rewards";
import LoginPage from "@/pages/login";
import SearchPage from "@/pages/search";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderHistoryPage />} />
        <Route path="/order/:id" element={<OrderCreatePage />} />
        <Route path="/order/completed/:id" element={<OrderCompletedPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/points" element={<PointHistoryPage />} />
        <Route path="/mypage/rewards" element={<RewardHistoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
