import { useContext } from "react";
import { AuthContext } from "../context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth not found!");
  return context;
};
