"use client";

import * as React from "react";
import {
  DataGrid,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  Paper,
  Button,
} from "@mui/material";
import { Plus, Edit, Delete, Eye, Wifi, Bot } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function ClientsPage() {
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    let active = true;
    const loadClients = async () => {
      const data = [
        {
          id: 1,
          name: "KashiTrip",
          logo: "https://i.pinimg.com/736x/08/4a/b2/084ab20ec51e99ff63a323e8b663dd31.jpg",
          plan: "Enterprise",
          aiStatus: "Active",
          usage: 85,
          memory: 72,
          connection: true,
          lastActive: "5 min ago",
        },
        {
          id: 2,
          name: "TechNova",
          logo: "https://i.pinimg.com/736x/08/4a/b2/084ab20ec51e99ff63a323e8b663dd31.jpg",
          plan: "Pro",
          aiStatus: "Active",
          usage: 54,
          memory: 45,
          connection: true,
          lastActive: "12 min ago",
        },
        {
          id: 3,
          name: "HealthSync AI",
          logo: "https://i.pinimg.com/736x/08/4a/b2/084ab20ec51e99ff63a323e8b663dd31.jpg",
          plan: "Starter",
          aiStatus: "Inactive",
          usage: 20,
          memory: 35,
          connection: false,
          lastActive: "1 day ago",
        },
        {
          id: 4,
          name: "EduVerse",
          logo: "https://i.pinimg.com/736x/08/4a/b2/084ab20ec51e99ff63a323e8b663dd31.jpg",
          plan: "Business",
          aiStatus: "Active",
          usage: 76,
          memory: 59,
          connection: true,
          lastActive: "2 hours ago",
        },
        {
          id: 5,
          name: "UrbanNest Realty",
          logo: "https://i.pinimg.com/736x/08/4a/b2/084ab20ec51e99ff63a323e8b663dd31.jpg",
          plan: "Enterprise",
          aiStatus: "Active",
          usage: 90,
          memory: 88,
          connection: true,
          lastActive: "10 min ago",
        },
      ];
      if (active) setClients(data);
    };
    loadClients();
    return () => {
      active = false;
    };
  }, []);

  const columns = [
    {
      field: "client",
      headerName: "Client",
      flex: 1.2,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={params.row.logo} alt={params.row.name} sx={{ width: 36, height: 36 }} />
          <Typography fontWeight={500}>{params.row.name}</Typography>
        </Stack>
      ),
    },
    {
      field: "plan",
      headerName: "Plan",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            fontWeight: 500,
            bgcolor:
              params.value === "Enterprise"
                ? "#DCFCE7"
                : params.value === "Pro"
                ? "#DBEAFE"
                : "#F3F4F6",
            color:
              params.value === "Enterprise"
                ? "#166534"
                : params.value === "Pro"
                ? "#1E3A8A"
                : "#374151",
          }}
        />
      ),
    },
    {
      field: "aiStatus",
      headerName: "AI Status",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: params.value === "Active" ? "#22c55e20" : "#ef444420",
            color: params.value === "Active" ? "#15803d" : "#b91c1c",
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: "usage",
      headerName: "Usage (%)",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{
              height: 8,
              borderRadius: 5,
              bgcolor: "#E5E7EB",
              "& .MuiLinearProgress-bar": {
                bgcolor:
                  params.value > 80
                    ? "#16a34a"
                    : params.value > 50
                    ? "#3b82f6"
                    : "#f97316",
              },
            }}
          />
        </Box>
      ),
    },
    {
      field: "memory",
      headerName: "Memory Usage (%)",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{
              height: 8,
              borderRadius: 5,
              bgcolor: "#E5E7EB",
              "& .MuiLinearProgress-bar": {
                bgcolor:
                  params.value > 80
                    ? "#22c55e"
                    : params.value > 50
                    ? "#3b82f6"
                    : "#f97316",
              },
            }}
          />
        </Box>
      ),
    },
    {
      field: "connection",
      headerName: "Connection",
      flex: 0.6,
      align: "center",
      renderCell: (params) => (
        <Wifi
          size={18}
          color={params.value ? "#16a34a" : "#dc2626"}
          style={{ opacity: params.value ? 1 : 0.6 }}
        />
      ),
    },
    { field: "lastActive", headerName: "Last Active", flex: 0.8 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View">
            <IconButton size="small" sx={{ color: "#2563eb" }}>
              <Eye size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" sx={{ color: "#16a34a" }}>
              <Edit size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{ color: "#dc2626" }}
              onClick={() => toast.error(`${params.row.name} deleted!`)}
            >
              <Delete size={16} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Toaster richColors position="top-right" />
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          bgcolor: "background.paper",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Bot size={22} color="#2563eb" />
            <Typography variant="h6" fontWeight={700}>
              Clients Management
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={() => toast.success("Add new client coming soon!")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 2.5,
              py: 1,
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            Add New
          </Button>
        </Stack>

        <Box
          sx={{
            height: 480,
            "& .MuiDataGrid-root": {
              border: "none",
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              borderBottom: "none",
              fontWeight: 700,
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #f1f5f9",
            },
            "& .MuiDataGrid-cell": {
              py: 1.2,
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              bgcolor: "#f9fafb",
            },
          }}
        >
          <DataGrid
            rows={clients}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbarQuickFilter,
            }}
            slotProps={{
              toolbar: {
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}


