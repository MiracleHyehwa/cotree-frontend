import CategoryPage from "@/pages/category";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import MyPage from "@/pages/mypage";
import OrderCreatePage from "@/pages/order/create";
import ProductDetailPage from "@/pages/productDetail";
import ShoppingCartPage from "@/pages/shoppingCart";

export const appRoutes = [
  { path: "/", element: <HomePage />, isPublic: true },
  { path: "/category", element: <CategoryPage />, isPublic: true },
  { path: "/product/:id", element: <ProductDetailPage />, isPublic: true },
  { path: "/order/:id", element: <OrderCreatePage />, isPublic: false },
  { path: "/cart", element: <ShoppingCartPage />, isPublic: false },
  { path: "/mypage", element: <MyPage />, isPublic: false },
  { path: "/login", element: <LoginPage />, isPublic: true },
];
