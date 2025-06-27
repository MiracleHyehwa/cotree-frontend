import { useOnboardingContext } from "@/features/onboarding/hooks";

interface RestrictedLayoutProps {
  children: React.ReactNode;
}

export default function RestrictedLayout({ children }: RestrictedLayoutProps) {
  const { gender, age } = useOnboardingContext();
  const progress = [gender, age].filter(Boolean).length * 50;

  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      <header id="main-header" className=" top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="w-full max-w-limit h-1 bg-background">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="relative z-20 flex w-full max-w-limit flex-row items-center justify-between gap-4 transition-colors bg-background h-[52px] max-h-[52px] min-h-[52px] px-24"></div>
      </header>

      <div
        id="main-content"
        className="flex w-full max-w-limit flex-1 flex-col items-stretch justify-start pb-safe-bottom pb-20 relative"
      >
        {children}
      </div>

      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-background max-w-limit" />
      </div>
    </div>
  );
}
