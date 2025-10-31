"use client";

import {
  Home,
  MessageCircle,
  Settings,
  LogOut,
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
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold text-blue-600">
            Naina
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={pathname === href}>
                    <Link href={href} className="flex items-center gap-2">
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

      <SidebarFooter className="border-t pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton variant="outline" className="justify-center">
              <LogOut size={18} className="mr-2" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
