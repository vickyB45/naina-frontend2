"use client";
import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
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

  const rows = clients.map((client, index) => ({
    id: client.id || index + 1,
    name: client.name,
    logo:
      client.logo ||
      "https://cdn3.pixelcut.app/enhance_after_1_a557cc1008.jpg",
    plan: client.plan,
    chats: client.performance?.chats ?? 0,
    conversion: client.performance?.conversion ?? 0,
    engagement: client.performance?.engagement ?? 0,
    aiStatus: client.aiStatus || "Inactive",
  }));

  const columns = [
    {
      field: "name",
      headerName: "Client",
      flex: 1.5,
      sortable: true,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
          <img
            src={params.row.logo}
            alt={params.value}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium">{params.value}</span>
        </div>
      ),
    },
    { field: "plan", headerName: "Plan", flex: 1 },
    {
      field: "chats",
      headerName: "AI Chats",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "conversion",
      headerName: "Conversion %",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "engagement",
      headerName: "Engagement %",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "aiStatus",
      headerName: "AI Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Badge
          className={`${
            params.value === "Active"
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
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            onClick={() =>
              router.push(`/super-admin/clients/${params.row.id}/edit`)
            }
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            onClick={() => onDelete && onDelete(params.row)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="shadow-sm border ">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 dark:text-gray-100">
          <Bot className="w-5 h-5 text-blue-500" /> Client Overview
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* scoped global CSS that forces the dark mode styles for the DataGrid */}
        <style jsx global>{`
          .dark .clients-data-grid-root .MuiSvgIcon-root {
            color: #E6EDF3 !important;
                 }
        `}</style>

        <Paper
          sx={{
            height: 500,
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
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbarQuickFilter }}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            sx={{
              border: 0,
              color: isDark ? "#E6EDF3" : "#1E1E1E",
              backgroundColor: isDark ? "#0d1117" : "#ffffff",
              "& .MuiDataGrid-row:hover": {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: isDark
                  ? "rgba(56,139,253,0.18) !important"
                  : "rgba(56,139,253,0.08) !important",
                color: isDark ? "#E6EDF3" : "#1E1E1E",
              },
            }}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
