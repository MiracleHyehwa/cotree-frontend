import { Boxes, Home, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type NavItemType = {
  key: string;
  path: string;
  label: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItemType[] = [
  { key: "home", path: "/", label: "홈", icon: <Home className="h-6 w-6 mb-1" /> },
  { key: "category", path: "/category", label: "카테고리", icon: <Boxes className="h-6 w-6 mb-1" /> },
  { key: "search", path: "/search", label: "검색", icon: <Search className="h-6 w-6 mb-1" /> },
  { key: "mypage", path: "/mypage", label: "마이페이지", icon: <User className="h-6 w-6 mb-1" /> },
];

export default function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 z-30 flex w-full flex-col items-center justify-center transition-position duration-300 ease-in-out h-[64px]">
      <nav className="fixed bottom-0 w-full max-w-limit border-t border-border bg-background pb-safe-bottom z-30">
        <div className="relative flex items-center justify-around w-full h-[64px]">
          {NAV_ITEMS.map(({ key, path, label, icon }) => (
            <NavItem key={key} path={path} label={label} icon={icon} isActive={pathname === path} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  path,
  label,
  icon,
  isActive,
}: {
  path: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link to={path} className="flex-1 flex flex-col items-center justify-center gap-0.5 text-xs">
      <span className={`${isActive ? "text-foreground" : "text-muted-foreground"}`}>{icon}</span>
      <span className={`${isActive ? "text-foreground font-medium" : "text-muted-foreground font-light"}`}>
        {label}
      </span>
    </Link>
  );
}
