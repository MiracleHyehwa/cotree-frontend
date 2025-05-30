import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/shared/components/ui/card";
import { toast } from "sonner";

function App() {
  const [name, setName] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground p-6 flex flex-col gap-8 items-center justify-center">
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>

      <Card className="w-[320px]">
        <CardHeader>
          <CardTitle>환경 점수</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">80점</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">자세히 보기</Button>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-2 w-[320px]">
        <Label htmlFor="name">이름 입력</Label>
        <Input id="name" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </main>
  );
}

export default App;
