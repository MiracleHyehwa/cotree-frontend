import { useContext } from "react";
import { OnboardingContext } from "../context/onboardingContext";

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error("OnboardingContext is missing");
  return context;
};
