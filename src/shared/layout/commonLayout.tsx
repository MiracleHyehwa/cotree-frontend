import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";

interface CommonLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function CommonLayout({ children, title = "" }: CommonLayoutProps) {
  return (
    <div
      id="main-container"
      className="relative flex min-h-screen max-w-limit w-full flex-col items-center justify-start overflow-hidden mx-auto"
    >
      <header id="main-header" className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-limit flex-row items-center justify-between gap-4 transition-colors bg-white h-[52px] max-h-[52px] min-h-[52px] px-24">
          <div className="absolute bottom-0 left-3 top-0 flex flex-row items-center justify-center">
            <Link to={"/"} className="fflex flex-1 items-center justify-center p-2">
              <span className="sr-only">Home</span>
              <img src="/logo.png" width={100} height={52} alt="logo" className="object-left -ml-3 pt-1" />
            </Link>
          </div>
          <div className="flex-1 truncate text-center text-sm transition-colors text-muted-foreground font-bold">
            {title}
          </div>

          <div className="absolute bottom-0 right-4 top-0 flex flex-row items-center justify-center gap-4">
            <Button
              type="button"
              className="relative -m-2 flex w-8 h-8 items-center justify-center p-2 cursor-pointer"
              variant="link"
            >
              <span className="sr-only">Search</span>
              <Search className="!w-6 !h-6 text-black" />
            </Button>
            <Link to={"/"} className="relative -m-2 flex h-10 w-10 items-center justify-center p-2">
              <span className="sr-only">ShoppingCart</span>
              <ShoppingCart className="!w-6 !h-6 text-black" />
            </Link>
          </div>
        </div>
      </header>

      <div
        id="main-content"
        className="flex w-full max-w-limit flex-1 flex-col items-start justify-start pt-6 text-left relative pb-16 overflow-hidden"
      >
        {children}
      </div>

      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-gray-100" />
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-limit" />
      </div>
    </div>
  );
}
