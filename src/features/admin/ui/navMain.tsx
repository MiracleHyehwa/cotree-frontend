import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";

type NavGroup = {
  label: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
};

export default function NavMain({ groups }: { groups: NavGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupContent>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition"
                  >
                    <a href={item.url} className="flex items-center w-full">
                      {item.icon && <item.icon className="size-4 shrink-0 text-muted-foreground" />}
                      <span className="ml-2 truncate">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
