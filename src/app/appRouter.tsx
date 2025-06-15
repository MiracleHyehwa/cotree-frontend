import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorFallback, ScrollToTop } from "@/shared/components";
import ProtectedRoutes from "./protectedRoutes";
import { ErrorBoundary } from "react-error-boundary";

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
const OnboardingPage = lazy(() => import("@/pages/onboarding"));
const EnvironmentPage = lazy(() => import("@/pages/mypage/environment"));
const AdminPage = lazy(() => import("@/pages/admin"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ProtectedRoutes />
            </ErrorBoundary>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/eco" element={<EcoPage />} />
          <Route path="/recommend" element={<RecommendPage />} />

          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route path="/order/completed/:id" element={<OrderCompletedPage />} />
          <Route path="/order" element={<OrderCreatePage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/points" element={<PointHistoryPage />} />
          <Route path="/mypage/rewards" element={<RewardHistoryPage />} />
          <Route path="/mypage/environment" element={<EnvironmentPage />} />

          <Route path="/search" element={<SearchPage />} />
        </Route>

        <Route path="/login/onboarding" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
