import { ReactNode, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { KakaoLoginBottomSheet } from "@/features/auth/ui";
import { AuthContext } from "../context";

const protectedPaths = [/^\/cart$/, /^\/mypage$/, /^\/order\/\d+$/];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<{
    to: string;
  } | null>(null);

  const isProtectedPath = (path: string) => protectedPaths.some((regex) => regex.test(path));

  const openAuthDrawer = useCallback((to: string) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setPendingNavigation({ to });
    setIsOpen(true);
  }, []);

  const authenticatedNavigate = useCallback(
    (to: string) => {
      if (isProtectedPath(to) && !isAuthenticated) {
        openAuthDrawer(to);
        return;
      }
      navigate(to);
    },
    [isAuthenticated, navigate, openAuthDrawer]
  );

  const login = useCallback(() => {
    console.log(`pendingNavigation : ${pendingNavigation}`);
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setPendingNavigation(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      authenticatedNavigate,
      openAuthDrawer,
    }),
    [isAuthenticated, login, logout, authenticatedNavigate, openAuthDrawer]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <KakaoLoginBottomSheet isOpen={isOpen} onClose={onClose} onLogin={login} />
    </AuthContext.Provider>
  );
}
