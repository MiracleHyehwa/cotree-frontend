import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  ListOrdered,
  PlusSquare,
  FolderKanban,
  Leaf,
  ScanSearch,
  Users,
  Coins,
  TreePine,
  ClipboardList,
  Settings,
} from "lucide-react";
import NavMain from "./navMain";
import NavUser from "./navUser";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "대시보드",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "분석 리포트",
      url: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "상품 목록",
      url: "/admin/products",
      icon: ListOrdered,
    },
    {
      title: "상품 등록",
      url: "/admin/products/new",
      icon: PlusSquare,
    },
    {
      title: "카테고리 관리",
      url: "/admin/categories",
      icon: FolderKanban,
    },
    {
      title: "친환경 태그 관리",
      url: "/admin/green-tags",
      icon: Leaf,
    },
    {
      title: "키워드 분석",
      url: "/admin/keywords",
      icon: ScanSearch,
    },
    {
      title: "회원 목록",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "포인트 관리",
      url: "/admin/points",
      icon: Coins,
    },
    {
      title: "경험치/레벨 관리",
      url: "/admin/exp",
      icon: TreePine,
    },
    {
      title: "운영 로그",
      url: "/admin/logs",
      icon: ClipboardList,
    },
    {
      title: "환경 설정",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="#">
                <User className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
