import { useContext } from "react";
import { EnvironmentContext } from "../context/environmentContext";

export function useEnvironmentContext() {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error("useEnvironmentContext는 EnvironmentProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
}
