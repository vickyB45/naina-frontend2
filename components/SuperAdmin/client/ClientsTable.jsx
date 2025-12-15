"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Paper from "@mui/material/Paper";

export const ClientsTable = ({ clients = [], onDelete }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;
  // console.log(clients)
  const client = clients.flatMap((client)=>{  
    return client
  }
  )

  // ✅ Map your new client structure
  const rows = client.map((client, index) => ({
    id: client._id || index + 1,
    logo: client.branding?.logo || "https://i.pinimg.com/736x/39/f6/5a/39f65ae95bf3c68b2af6605813f1d7a2.jpg",
    companyName: client.companyName,
    contactPerson: client.contactPerson,
    email: client.email,
    planType: client.plan?.type || "N/A",
    chatLimit: client.plan?.chatLimit || 0,
    totalChats: client.analytics?.totalChats || 0,
    activeUsers: client.analytics?.activeUsers || 0,
    avgResponseTime: client.analytics?.avgResponseTime || "-",
    aiModel: client.aiSettings?.model || "N/A",
    memory: client.aiSettings?.memoryEnabled ? "Enabled" : "Disabled",
    status: client.status || "inactive",
  }));

  const columns = [
    {
      field: "companyName",
      headerName: "Company",
      flex: 1.5,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
          <img
            src={params.row.logo}
            alt={params.value}
            className="w-8 h-8 rounded-full object-cover border"
          />
          <div>
            <div className="font-medium">{params.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {params.row.contactPerson}
            </div>
          </div>
        </div>
      ),
    },
    { field: "planType", headerName: "Plan", flex: 1 },
    {
      field: "chatLimit",
      headerName: "Chat Limit",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalChats",
      headerName: "Total Chats",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "activeUsers",
      headerName: "Active Users",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "avgResponseTime",
      headerName: "Avg. Response Time",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "aiModel",
      headerName: "AI Model",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "memory",
      headerName: "Memory",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Badge
          className={`${
            params.value === "Enabled"
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
          }`}
        >
          {params.value}
        </Badge>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Badge
          className={`${
            params.value === "active"
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
          }`}
        >
          {params.value}
        </Badge>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              router.push(`/super-admin/clients/${params.row.id}/edit`)
            }
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDelete && onDelete(params.row)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="shadow-sm border">
      <CardContent>
        <style jsx global>{`
          .dark .clients-data-grid-root .MuiSvgIcon-root {
            color: #E6EDF3 !important;
          }
        `}</style>

        <Paper
          sx={{
            height: 550,
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
          elevation={0}
        >
          <DataGrid
            className="clients-data-grid-root"
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbarQuickFilter }}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            sx={{
              border: 0,
              color: isDark ? "#E6EDF3" : "#1E1E1E",
              backgroundColor: isDark ? "#0d1117" : "#ffffff",
              "& .MuiDataGrid-row:hover": {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
              },
            }}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
