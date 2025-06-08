import { OnboardingProvider } from "@/features/onboarding/context";
import { OnboardingForm } from "@/features/onboarding/ui";
import { RestrictedLayout } from "@/shared/layout";

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <RestrictedLayout>
        <OnboardingForm>
          <OnboardingForm.Message />
          <OnboardingForm.GenderSelector />
          <OnboardingForm.AgeSelector />
          <OnboardingForm.Submit
            onSubmit={({ gender, age }) => {
              console.log("최종 제출값", gender, age);
            }}
          />
        </OnboardingForm>
      </RestrictedLayout>
    </OnboardingProvider>
  );
}
