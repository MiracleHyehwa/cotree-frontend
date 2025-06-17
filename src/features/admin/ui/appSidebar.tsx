import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, BarChart3, ListOrdered, PlusSquare } from "lucide-react";
import NavMain from "./navMain";
import NavUser from "./navUser";

const data = {
  user: {
    name: "관리자",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      label: "운영",
      items: [
        { title: "대시보드", url: "/admin/dashboard", icon: LayoutDashboard },
        { title: "분석 리포트", url: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      label: "상품 관리",
      items: [
        { title: "상품 목록", url: "/admin/products", icon: ListOrdered },
        { title: "상품 등록", url: "/admin/products/new", icon: PlusSquare },
      ],
    },
  ],
};

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/admin/dashboard">
                <span className="text-2xl font-mono font-semibold text-primary">COTREE</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
