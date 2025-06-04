import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const protectedPaths = ["/cart", "/mypage", "/order"];

export const useAuthenticatedNavigate = () => {
  const { isAuthenticated, openAuthDrawer } = useAuth();
  const navigate = useNavigate();

  return (to: string | number, options?: { replace?: boolean }) => {
    if (typeof to === "string") {
      const isProtected = protectedPaths.some((p) => to.startsWith(p));
      if (isProtected && !isAuthenticated) {
        openAuthDrawer(to);
        return;
      }
      navigate(to, options);
    } else {
      navigate(to);
    }
  };
};
