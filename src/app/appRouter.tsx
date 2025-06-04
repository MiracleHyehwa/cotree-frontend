import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./appRoute";
import { AuthProvider } from "@/features/auth/provider";
import { ProtectedRoute } from "@/features/auth/config";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {appRoutes.map(({ path, element, isPublic }) => (
            <Route key={path} path={path} element={<ProtectedRoute isPublic={isPublic}>{element}</ProtectedRoute>} />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
