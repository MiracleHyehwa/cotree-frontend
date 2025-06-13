import { Button } from "@/shared/components/ui/button";
import { useSearchFilterContext } from "../hooks";

export default function GreenFilterToggle() {
  const { isGreen, setIsGreen } = useSearchFilterContext();

  const handleClick = () => {
    setIsGreen(isGreen ? null : true);
  };

  return (
    <Button
      variant={isGreen ? "default" : "outline"}
      size="sm"
      onClick={handleClick}
      className="rounded-full px-3 py-1 text-sm cursor-pointer"
    >
      친환경
    </Button>
  );
}
