"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";

// 🔹 Utility: Convert timestamp to "x min ago"
const timeAgo = (timestamp) => {
  if (!timestamp) return "N/A";

  const now = new Date();
  const then = new Date(timestamp);

  // ✅ Ensure we compare both in UTC
  const diffMs = now.getTime() - then.getTime();
  const seconds = Math.floor(diffMs / 1000);

  if (seconds < 0) return "Just now"; // future timestamps ka case

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};


export const UsersTable = ({ users = [], onDelete }) => {
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

  // 🔹 Map data for DataGrid
  const rows = users.map((user, index) => ({
    id: user._id || index + 1,
    avatar: user.avatar || "https://i.pinimg.com/736x/60/18/2d/60182d8ecbe7633cd1063e8ed2d41595.jpg",
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    plan: user.plan || "Free",
    // permissions: user.permissions || {},
    usage: user.usage || {},
    totalChats: user.usage?.totalChats || 0,
    avgResponseTime: user.usage?.avgResponseTime || "-",
    lastActive: timeAgo(user.usage?.lastActive),
  }));

  const columns = [
    {
      field: "name",
      headerName: "User",
      flex: 1.5,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
          <img
            src={params.row.avatar}
            alt={params.value}
            className="w-9 h-9 rounded-full object-cover border border-gray-300 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm">{params.value}</span>
            <span className="text-xs text-muted-foreground">
              {params.row.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Badge
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            params.value === "active"
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
          }`}
        >
          {params.value}
        </Badge>
      ),
    },
    // {
    //   field: "permissions",
    //   headerName: "Permissions",
    //   flex: 1.8,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (params) => {
    //     const perms = params.value;
    //     const permLabels = [
    //       { key: "viewChats", label: "Chats" },
    //       { key: "editFlows", label: "Flows" },
    //       { key: "manageUsers", label: "Users" },
    //       { key: "viewAnalytics", label: "Analytics" },
    //     ];
    //     return (
    //       <div className="flex flex-wrap justify-center gap-2">
    //         {permLabels.map((p) => (
    //           <div
    //             key={p.key}
    //             className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
    //               perms[p.key]
    //                 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
    //                 : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300"
    //             }`}
    //           >
    //             {perms[p.key] ? (
    //               <Check className="w-3 h-3" />
    //             ) : (
    //               <X className="w-3 h-3" />
    //             )}
    //             {p.label}
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "totalChats",
      headerName: "Total Chats",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "avgResponseTime",
      headerName: "Avg Response",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastActive",
      headerName: "Last Active",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span className="text-xs text-muted-foreground">
          {params.value || "—"}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
            onClick={() =>
              router.push(`/super-admin/users/${params.row.id}/edit`)
            }
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            onClick={() => onDelete && onDelete(params.row)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="shadow-md border border-border/40 rounded-2xl backdrop-blur-sm">
      <CardContent className="p-6">
        <Paper
          sx={{
            height: 580,
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
          elevation={0}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbarQuickFilter }}
            initialState={{
              pagination: { paginationModel: { pageSize: 6 } },
            }}
            pageSizeOptions={[6, 10, 25]}
            sx={{
              border: 0,
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              color: isDark ? "#E6EDF3" : "#1E1E1E",
              backgroundColor: isDark ? "#0d1117" : "#ffffff",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: isDark ? "#161B22" : "#F9FAFB",
                borderBottom: "1px solid #E5E7EB",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid #F0F0F0",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(59,130,246,0.05)",
                transition: "background 0.2s ease",
              },
            }}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
