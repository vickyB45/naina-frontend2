"use client";

import { useGetAllTenants } from "@/hooks/superadmin/admins/query/adminQuery";
import { Button } from "@/components/ui/button";
import { SUPERADMIN_ADD_CLIENT } from "@/routes/superAdminRoutes";
import { useRouter } from "next/navigation";
import { ClientsTable } from "@/components/SuperAdmin/client/ClientsTable";

export default function ClientsPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAllTenants();

  const clients =
    data?.pages?.flatMap((page) => page.data) ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading clients</p>;

  return (
    <div className="p-2 max-w-6xl mx-auto">

      {/* 🔥 Server Component */}
      <ClientsTable clients={clients} />
    </div>
  );
}
