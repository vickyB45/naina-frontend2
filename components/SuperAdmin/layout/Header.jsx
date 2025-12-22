"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./mode-toggle";
import { useMe } from "@/hooks/superadmin/auth/superadmin.manageserver";

export default function Header({ breadcrumbItems = [] }) {

    const { data, isLoading, isError } = useMe();

  return (
    <header className="flex w-full items-center justify-between h-16 px-4 border-b bg-white dark:bg-neutral-900 sticky top-0 z-50 shadow-sm">
      {/* Left: SidebarTrigger + Breadcrumb */}
      <div className="flex w-full items-center gap-3">
       <div className="flex justify-between  w-full items-center ">
         <div className="flex items-center gap-4">
          <SidebarTrigger />
        </div>
      <ModeToggle />
       </div>
        <Separator orientation="vertical" className="h-6" />
      </div>

      {/* Right: Theme Toggle */}
      <div className="flex items-center gap-2">
        
      </div>
    </header>
  );
}
