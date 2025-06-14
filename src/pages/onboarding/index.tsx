import { useMemberDashboard } from "@/entities/member/api/hooks";
import { OnboardingProvider } from "@/features/onboarding/context";
import { OnboardingForm } from "@/features/onboarding/ui";
import { RestrictedLayout } from "@/shared/layout";
import { Navigate } from "react-router-dom";

export default function OnboardingPage() {
  const { data: user } = useMemberDashboard();

  const alreadyOnboarded = user?.gender && user?.ageRange;
  if (alreadyOnboarded) {
    return <Navigate to="/" replace />;
  }

  return (
    <OnboardingProvider>
      <RestrictedLayout>
        <OnboardingForm>
          <OnboardingForm.Message />
          <OnboardingForm.GenderSelector />
          <OnboardingForm.AgeSelector />
          <OnboardingForm.Submit />
        </OnboardingForm>
      </RestrictedLayout>
    </OnboardingProvider>
  );
}
