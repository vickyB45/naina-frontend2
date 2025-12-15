"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Settings,
  LogOut,
  Users,
  FolderKanban,
  BarChart3,
  Brain,
  ChevronDown,
  ChevronUp,
  Server,
} from "lucide-react";

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

import {
  SUPERADMIN_DASHBOARD,
  SUPERADMIN_CLIENTS,
  SUPERADMIN_ADD_CLIENT,
  SUPERADMIN_TRAFFIC_INSIGHTS,
  SUPERADMIN_INTERNAL_ANALYTICS,
  SUPERADMIN_ENGAGEMENT_BEHAVIOR,
  SUPERADMIN_AI_SETTINGS,
  SUPERADMIN_AI_MEMORY,
  SUPERADMIN_AI_PERSONA,
  SUPERADMIN_SYSTEM,
  SUPERADMIN_SYSTEM_LOGS,
  SUPERADMIN_SYSTEM_BACKUPS,
  SUPERADMIN_USERS,
  SUPERADMIN_ADD_USER,
  SUPERADMIN_SETTINGS,
} from "@/routes/superAdminRoutes";

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // ===============================
  // 🧭 Super Admin Menu Structure
  // ===============================
  const menu = [
    {
      label: "Dashboard",
      icon: Home,
      href: SUPERADMIN_DASHBOARD,
    },
    {
      label: "Clients",
      icon: FolderKanban,
      items: [
        { label: "All Clients", href: SUPERADMIN_CLIENTS },
        { label: "Add Client", href: SUPERADMIN_ADD_CLIENT },
      ],
    },
    {
      label: "Analytics",
      icon: BarChart3,
      items: [
        { label: "Traffic Insights", href: SUPERADMIN_TRAFFIC_INSIGHTS },
        { label: "Internal Analytics", href: SUPERADMIN_INTERNAL_ANALYTICS },
        { label: "Engagement Behavior", href: SUPERADMIN_ENGAGEMENT_BEHAVIOR },
      ],
    },
    {
      label: "AI Settings",
      icon: Brain,
      items: [
        { label: "Chat Flow Rules", href: SUPERADMIN_AI_SETTINGS },
        { label: "Memory Settings", href: SUPERADMIN_AI_MEMORY },
        { label: "Personality Setup", href: SUPERADMIN_AI_PERSONA },
      ],
    },
    {
      label: "System",
      icon: Server,
      items: [
        { label: "System Overview", href: SUPERADMIN_SYSTEM },
        { label: "Logs", href: SUPERADMIN_SYSTEM_LOGS },
        { label: "Backups", href: SUPERADMIN_SYSTEM_BACKUPS },
      ],
    },
    {
      label: "Users",
      icon: Users,
      items: [
        { label: "All Users", href: SUPERADMIN_USERS },
        // { label: "Add New", href: SUPERADMIN_ADD_USER },
      ],
    },
    {
      label: "Settings",
      icon: Settings,
      href: SUPERADMIN_SETTINGS,
    },
  ];

  // ===============================
  // 💡 Utility: Active Link
  // ===============================
  const isActive = (href) => pathname === href;

  return (
    <Sidebar className="flex flex-col justify-between border-r bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100 h-screen">
      {/* Sidebar Header */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-center text-2xl font-bold text-blue-600 border-b h-14 flex items-center justify-center">
            Naina
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 py-2">
              {menu.map((item) => (
                <React.Fragment key={item.label}>
                  {/* ✅ Single Link */}
                  {!item.items ? (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => router.push(item.href)}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-blue-100 text-blue-600 dark:bg-neutral-800 dark:text-blue-400"
                            : "hover:bg-blue-50 dark:hover:bg-neutral-800"
                        }`}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    // ✅ Dropdown Menu
                    <div>
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          openMenu === item.label
                            ? "bg-blue-100 text-blue-600 dark:bg-neutral-800 dark:text-blue-400"
                            : "hover:bg-blue-50 dark:hover:bg-neutral-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon size={18} />
                          <span>{item.label}</span>
                        </div>
                        {openMenu === item.label ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      {/* 🔽 Dropdown Links */}
                      {openMenu === item.label && (
                        <div className="pl-8 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          {item.items.map((sub) => (
                            <button
                              key={sub.href}
                              onClick={() => router.push(sub.href)}
                              className={`w-full text-left block rounded-md px-2 py-1 text-sm transition-colors ${
                                isActive(sub.href)
                                  ? "bg-blue-100 text-blue-600 dark:bg-neutral-800 dark:text-blue-400"
                                  : "hover:bg-blue-50 dark:hover:bg-neutral-800"
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
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
