import CategoryPage from "@/pages/category";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import MyPage from "@/pages/mypage";
import OrderCompletedPage from "@/pages/order/complete";
import OrderCreatePage from "@/pages/order/create";
import ProductDetailPage from "@/pages/productDetail";
import SearchPage from "@/pages/search";
import ShoppingCartPage from "@/pages/shoppingCart";

export const appRoutes = [
  { path: "/", element: <HomePage />, isPublic: true },
  { path: "/category", element: <CategoryPage />, isPublic: true },
  { path: "/product/:id", element: <ProductDetailPage />, isPublic: true },
  { path: "/order/:id", element: <OrderCreatePage />, isPublic: false },
  { path: "/order/completed/:id", element: <OrderCompletedPage />, isPublic: true },
  { path: "/cart", element: <ShoppingCartPage />, isPublic: false },
  { path: "/mypage", element: <MyPage />, isPublic: false },
  { path: "/login", element: <LoginPage />, isPublic: true },
  { path: "/search", element: <SearchPage />, isPublic: true },
];
