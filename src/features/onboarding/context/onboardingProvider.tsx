import { useState } from "react";
import { OnboardingContext } from "./onboardingContext";

export default function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);

  return <OnboardingContext.Provider value={{ gender, age, setGender, setAge }}>{children}</OnboardingContext.Provider>;
}
