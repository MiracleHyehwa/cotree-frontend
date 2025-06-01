import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui/checkbox";
import HeaderHomeLayout from "@/shared/layout/headerHomeLayout";

const products = [
  {
    id: 1,
    name: "친환경 국산 사과즙 100%",
    image: "https://dummyimage.com/120x160/ffffe0/000&text=사과즙",
    brand: "자연애",
    option: "1박스 / 30포",
    price: 12000,
    quantity: 1,
  },
  {
    id: 2,
    name: "무농약 유기농 바나나",
    image: "https://dummyimage.com/120x160/fffae0/000&text=바나나",
    brand: "그린팜",
    option: "1kg / 봉지",
    price: 5800,
    quantity: 2,
  },
];

export default function OrderCreatePage() {
  const [isChecked, setIsChecked] = useState(false);

  const productTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shippingFee = 0;
  const discount = 0;
  const point = 0;
  const total = productTotal - discount - point + shippingFee;

  return (
    <HeaderHomeLayout title="주문/결제">
      <div className="w-full max-w-limit mx-auto px-4 py-6 bg-background space-y-8">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">배송지 정보</h2>
            <Button size="sm" variant="link">
              등록
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">배송지 정보가 없습니다. 배송지를 먼저 등록해주세요.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-lg">주문상품</h2>
          {products.map((p, i) => (
            <div key={p.id} className={`flex gap-4 pt-4 ${i !== 0 ? "border-t border-border" : ""}`}>
              <img src={p.image} alt={p.name} className="w-24 aspect-square object-cover rounded" />
              <div className="flex-1 text-sm">
                <div className="text-muted-foreground mb-1">{p.brand}</div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.option}</div>
                <div className="mt-2 font-bold text-base">
                  {p.price.toLocaleString()}원 / {p.quantity}개
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-lg">결제수단</h2>

          <RadioGroup value="general" disabled className="flex items-center gap-2">
            <RadioGroupItem value="general" id="general" disabled />
            <Label htmlFor="general" className="text-base font-medium text-foreground">
              일반결제
            </Label>
          </RadioGroup>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "신용카드", disabled: false },
              { label: "간편결제", disabled: true },
              { label: "가상계좌", disabled: true },
              { label: "휴대폰결제", disabled: true },
              { label: "실시간 계좌이체", disabled: true },
            ].map(({ label, disabled }) => (
              <button
                key={label}
                disabled={disabled}
                className={`text-sm border rounded-md px-3 py-2 ${
                  label === "신용카드" ? "bg-primary text-white font-semibold" : "bg-muted text-muted-foreground"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-4 mt-4">
            <div>
              <Label className="mb-1 block text-sm font-medium">카드 번호</Label>
              <div className="flex gap-2">
                <Input placeholder="****" maxLength={4} className="w-1/4 placeholder:text-muted-foreground/50" />
                <Input placeholder="****" maxLength={4} className="w-1/4 placeholder:text-muted-foreground/50" />
                <Input placeholder="****" maxLength={4} className="w-1/4 placeholder:text-muted-foreground/50" />
                <Input placeholder="****" maxLength={4} className="w-1/4 placeholder:text-muted-foreground/50" />
              </div>
            </div>

            <div className="w-full">
              <Select>
                <SelectTrigger className="w-full max-w-limit">
                  <SelectValue placeholder="은행을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shinhan">신한은행</SelectItem>
                  <SelectItem value="kb">국민은행</SelectItem>
                  <SelectItem value="hana">하나은행</SelectItem>
                  <SelectItem value="woori">우리은행</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select>
                <SelectTrigger className="w-full max-w-limit">
                  <SelectValue placeholder="일시불" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">일시불</SelectItem>
                  <SelectItem value="2">2개월</SelectItem>
                  <SelectItem value="3">3개월</SelectItem>
                  <SelectItem value="6">6개월</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-lg">주문 정보 확인</h2>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" checked={isChecked} onCheckedChange={(checked) => setIsChecked(!!checked)} />{" "}
            <Label htmlFor="agree" className="text-sm text-muted-foreground">
              주문 내용을 확인하였으며, 결제에 동의합니다.
            </Label>
          </div>
        </section>
      </div>

      <div className="w-full max-w-limit fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-border z-20">
        <div className="max-w-limit mx-auto px-4 py-4">
          <Button className="w-full text-base font-bold h-12" disabled={!isChecked}>
            {total.toLocaleString()}원 결제하기
          </Button>
        </div>
      </div>
    </HeaderHomeLayout>
  );
}
