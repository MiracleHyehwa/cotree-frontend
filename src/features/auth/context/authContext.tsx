import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  authenticatedNavigate: (to: string) => void;
  openAuthDrawer: (to: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
