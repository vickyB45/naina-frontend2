"use client";

import Sidebar from "@/components/SuperAdmin/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/SuperAdmin/layout/Header";

export default function ClientLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header
            breadcrumbItems={[
              { label: "Dashboard", href: "/dashboard" },
            ]}
          />

          {/* Page Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
