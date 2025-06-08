import { createContext, Dispatch, SetStateAction } from "react";

interface OnboardingContextType {
  gender: string | null;
  setGender: Dispatch<SetStateAction<string | null>>;
  age: string | null;
  setAge: Dispatch<SetStateAction<string | null>>;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);
