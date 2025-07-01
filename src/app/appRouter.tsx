import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/shared/components";
import { AdminLayout } from "@/shared/layout";
import ForbiddenPage from "@/pages/forbidden";
import EventToast from "@/features/event/ui/eventToast";

const HomePage = lazy(() => import("@/pages/home"));
const EcoPage = lazy(() => import("@/pages/eco"));
const RecommendPage = lazy(() => import("@/pages/recommend"));
const CategoryPage = lazy(() => import("@/pages/category"));
const ProductDetailPage = lazy(() => import("@/pages/productDetail"));
const OrderHistoryPage = lazy(() => import("@/pages/order"));
const OrderCreatePage = lazy(() => import("@/pages/order/create"));
const OrderDetailPage = lazy(() => import("@/pages/order/detail"));
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

const AdminLoginPage = lazy(() => import("@/pages/admin/login"));
const AdminDashBoardPage = lazy(() => import("@/pages/admin/dashboard"));
const AdminNotFound = lazy(() => import("@/pages/adminNotFound"));
const AdminAnalyticsPage = lazy(() => import("@/pages/admin/analytics"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <EventToast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eco" element={<EcoPage />} />
        <Route path="/recommend" element={<RecommendPage />} />

        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route path="/order/completed/:orderId" element={<OrderCompletedPage />} />
        <Route path="/order" element={<OrderCreatePage />} />
        <Route path="/order/detail/:orderId" element={<OrderDetailPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/points" element={<PointHistoryPage />} />
        <Route path="/mypage/rewards" element={<RewardHistoryPage />} />
        <Route path="/mypage/environment" element={<EnvironmentPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashBoardPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="*" element={<AdminNotFound />} />
        </Route>

        <Route path="/login/onboarding" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />

        <Route path="/forbidden" element={<ForbiddenPage />} />
      </Routes>
    </BrowserRouter>
  );
}
