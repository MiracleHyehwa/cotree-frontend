import { Link } from "react-router-dom";

interface LoginLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function LoginLayout({ children, title = "" }: LoginLayoutProps) {
  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      <header id="main-header" className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-limit flex-row items-center justify-between gap-4 transition-colors bg-white h-[52px] max-h-[52px] min-h-[52px] px-24">
          <div className="absolute bottom-0 left-3 top-0 flex flex-row items-center justify-center">
            <Link to={"/"} className="fflex flex-1 items-center justify-center p-2">
              <span className="sr-only">Home</span>
              <img
                src="/header-logo.png"
                width={60}
                height={52}
                alt="logo"
                className="max-h-[52px] h-[52px] object-left pt-1"
              />
            </Link>
          </div>
          <div className="flex-1 truncate text-center text-sm transition-colors text-muted-foreground font-bold">
            {title}
          </div>
        </div>
      </header>

      <div
        id="main-content"
        className="flex w-full max-w-limit flex-1 flex-col items-stretch justify-start pb-safe-bottom"
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
