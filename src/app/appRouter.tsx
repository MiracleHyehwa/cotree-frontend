import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/home";
import CategoryPage from "@/pages/category";
import ProductDetailPage from "@/pages/productDetail";
import OrderHistoryPage from "@/pages/order";
import OrderCreatePage from "@/pages/order/create";
import OrderCompletedPage from "@/pages/order/completed";
import CartPage from "@/pages/cart";
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

        {/* 상품 */}
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* 주문 */}
        <Route path="/order/completed/:id" element={<OrderCompletedPage />} />
        <Route path="/order/:id" element={<OrderCreatePage />} />
        <Route path="/order" element={<OrderHistoryPage />} />

        {/* 장바구니 */}
        <Route path="/cart" element={<CartPage />} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/points" element={<PointHistoryPage />} />
        <Route path="/mypage/rewards" element={<RewardHistoryPage />} />

        {/* 인증 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 검색 */}
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
