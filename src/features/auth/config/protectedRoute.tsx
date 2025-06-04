import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

interface ProtectedRouteProps {
  isPublic?: boolean;
  children: React.ReactNode;
}

export default function ProtectedRoute({ isPublic = false, children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isPublic && !isAuthenticated) {
    const redirectPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
  }

  return <>{children}</>;
}
