import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useOnboardingContext } from "../hooks";
import { useUpdateAgeGender } from "@/entities/member/api/hooks";
import { useNavigate } from "react-router-dom";
import Spinner from "@/shared/components/ui/spinner";

const genderOptions = [
  { value: "M", label: "남성" },
  { value: "F", label: "여성" },
];

const ageOptions = [
  { value: "10", label: "10대" },
  { value: "20", label: "20대" },
  { value: "30", label: "30대" },
  { value: "40", label: "40대" },
  { value: "50", label: "50대" },
  { value: "60", label: "60대 이상" },
];

export default function OnboardingForm({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Message() {
  return (
    <div className="text-center mb-8 px-4">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">👋</span>
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">추가 정보 입력</h1>
      <p className="text-sm text-muted-foreground">더 나은 서비스를 위해 정보를 입력해주세요</p>
    </div>
  );
}

function GenderSelector() {
  const { gender, setGender } = useOnboardingContext();

  return (
    <div className="space-y-4 mb-10 px-4">
      <p className="text-lg font-semibold text-foreground">성별을 선택해주세요</p>
      <div className="grid grid-cols-2 gap-3">
        {genderOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            onClick={() => setGender(option.value)}
            className={cn("cursor-pointer h-12", gender === option.value && "border-primary text-primary")}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function AgeSelector() {
  const { age, setAge } = useOnboardingContext();

  return (
    <div className="space-y-4 px-4">
      <p className="text-lg font-semibold text-foreground">연령대를 선택해주세요</p>
      <div className="grid grid-cols-3 gap-3">
        {ageOptions.map(({ value, label }) => (
          <Button
            key={value}
            variant="outline"
            onClick={() => setAge(value)}
            className={cn("cursor-pointer h-12", age === value && "border-primary text-primary")}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function Submit() {
  const { mutate: updateAgeAndGender, isPending } = useUpdateAgeGender();
  const { gender, age } = useOnboardingContext();
  const navigate = useNavigate();
  const isValid = gender && age;

  const handleSubmit = () => {
    if (!isValid || isPending) return;

    updateAgeAndGender(
      { gender: gender!, ageRange: age! },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };
  return (
    <div className="w-full max-w-limit fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-border z-50">
      <div className="max-w-limit mx-auto px-4 py-4">
        <Button disabled={!isValid} onClick={handleSubmit} className="w-full h-12">
          {isPending ? <Spinner /> : "완료"}
        </Button>
      </div>
    </div>
  );
}

OnboardingForm.Message = Message;
OnboardingForm.GenderSelector = GenderSelector;
OnboardingForm.AgeSelector = AgeSelector;
OnboardingForm.Submit = Submit;
