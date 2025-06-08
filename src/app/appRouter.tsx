import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/home"));
const EcoPage = lazy(() => import("@/pages/eco"));
const RecommendPage = lazy(() => import("@/pages/recommend"));
const CategoryPage = lazy(() => import("@/pages/category"));
const ProductDetailPage = lazy(() => import("@/pages/productDetail"));
const OrderHistoryPage = lazy(() => import("@/pages/order"));
const OrderCreatePage = lazy(() => import("@/pages/order/create"));
const OrderCompletedPage = lazy(() => import("@/pages/order/completed"));
const CartPage = lazy(() => import("@/pages/cart"));
const MyPage = lazy(() => import("@/pages/mypage"));
const PointHistoryPage = lazy(() => import("@/pages/mypage/points"));
const RewardHistoryPage = lazy(() => import("@/pages/mypage/rewards"));
const LoginPage = lazy(() => import("@/pages/login"));
const SearchPage = lazy(() => import("@/pages/search"));
const NotFoundPage = lazy(() => import("@/pages/notFound"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eco" element={<EcoPage />} />
        <Route path="/recommend" element={<RecommendPage />} />

        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route path="/order/completed/:id" element={<OrderCompletedPage />} />
        <Route path="/order/:id" element={<OrderCreatePage />} />
        <Route path="/order" element={<OrderHistoryPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/points" element={<PointHistoryPage />} />
        <Route path="/mypage/rewards" element={<RewardHistoryPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
