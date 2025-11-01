"use client";

import {
  Home,
  Settings,
  LogOut,
  TowerControl,
  BarChart3,
  LineChart,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

const links = [
  { href: "/super-admin", label: "Dashboard", icon: Home },
  {
    href: "/super-admin/traffic-insights-dashboard",
    label: "Traffic Insights",
    icon: TowerControl,
  },
  {
    href: "/super-admin/internal-analytics",
    label: "Internal Analytics",
    icon: BarChart3,
  },
  {
    href: "/super-admin/engagement-behavior",
    label: "Engagement Behavior",
    icon: LineChart,
  },
  { href: "/super-admin/settings", label: "Settings", icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="flex flex-col justify-between border-r bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100 h-screen">
      {/* Sidebar Top + Main Menu */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-center text-2xl w-full font-[500] text-blue-600 border-b mb-4 px-2 py-3">
            Naina
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 ">
              {links.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-blue-50 dark:hover:bg-neutral-800 ${
                      pathname === href
                        ? "bg-blue-100 text-blue-600 dark:bg-neutral-800 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    <Link href={href}>
                      <Icon size={18} />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t mt-auto p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              variant="outline"
              className="w-full justify-center hover:bg-red-50 dark:hover:bg-neutral-800 transition"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
