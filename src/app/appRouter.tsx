import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home";
import CategoryPage from "@/pages/category";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
