import { Outlet } from "react-router-dom";
import { AppSidebar, SiteHeader } from "@/features/admin/ui";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider
      className="flex"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
