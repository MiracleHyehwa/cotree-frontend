import { useMemberDashboard } from "@/entities/member/api/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const location = useLocation();
  const { data: user } = useMemberDashboard();

  const shouldRedirectToOnboarding = user && (!user.gender || !user.ageRange);
  const isOnboardingPage = location.pathname === "/login/onboarding";

  if (shouldRedirectToOnboarding && !isOnboardingPage) {
    return <Navigate to="/login/onboarding" replace />;
  }

  return <Outlet />;
}
