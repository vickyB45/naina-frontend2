"use client";
import { UsersTable } from "@/components/SuperAdmin/users/UsersTable";
import { users } from "@/lib/users";
import React from "react";

export default function UserPage() {
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      </div>
    
      <UsersTable users={users} />
    </div>
  );
}
