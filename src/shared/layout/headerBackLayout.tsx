import { useCartItemCount } from "@/entities/cart/api/hooks";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderBackLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function HeaderBackLayout({ children, title = "" }: HeaderBackLayoutProps) {
  const navigate = useNavigate();
  const { data: count = 0, isLoading } = useCartItemCount();

  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      <header id="main-header" className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-limit flex-row items-center justify-between gap-4 transition-colors bg-white h-[52px] max-h-[52px] min-h-[52px] px-24">
          <div className="absolute bottom-0 left-3 top-0 flex flex-row items-center justify-center">
            <Button onClick={() => navigate(-1)} className="w-8 h-8 p-2 cursor-pointer" variant={"link"}>
              <span className="sr-only">뒤로가기</span>
              <ArrowLeft className="w-5 h-5 text-black" />
            </Button>
          </div>
          <div className="flex-1 truncate text-center text-sm transition-colors text-muted-foreground font-bold">
            {title}
          </div>

          <div className="absolute bottom-0 right-4 top-0 flex flex-row items-center justify-center gap-4">
            <Link to={"/cart"} className="relative -m-2 flex h-10 w-10 items-center justify-center p-2">
              <span className="sr-only">ShoppingCart</span>
              <ShoppingCart className="!w-6 !h-6 text-black" />
              {!isLoading && count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div
        id="main-content"
        className="flex w-full max-w-limit flex-1 flex-col items-stretch justify-start pb-safe-bottom pb-16"
      >
        {children}
      </div>

      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-black" />
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-limit" />
      </div>
    </div>
  );
}
