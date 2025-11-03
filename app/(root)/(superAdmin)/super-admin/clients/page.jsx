"use client";
import { ClientsTable } from "@/components/SuperAdmin/client/ClientsTable";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/users";
import { SUPERADMIN_ADD_CLIENT } from "@/routes/superAdminRoutes";
import { useRouter } from "next/navigation";
import React from "react";

export default function ClientsPage() {
  const router = useRouter()
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Client Management</h1>
        <Button
          className="cursor-pointer text-white"
          type="button"
          onClick={() => router.push(SUPERADMIN_ADD_CLIENT)} // example navigation
        >
          Add New Client
        </Button>
      </div>
      <ClientsTable clients={clients} />
    </div>
  );
}
