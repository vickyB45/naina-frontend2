export const systemHelth = [{
  systemHealth: {
    status: "healthy",
    uptime: "99.98%",
    lastChecked: "2025-11-07T10:25:42Z",
    responseTime: "142ms",
    apiLatency: {
      avg: 120,
      min: 85,
      max: 190,
    },
    activeUsers: 128,
    serverLoad: {
      cpu: 47,
      memory: 63,
      disk: 71,
    },
    services: [
      { name: "Database", status: "online", latency: "22ms" },
      { name: "AI Engine", status: "online", latency: "118ms" },
      { name: "Email Service", status: "degraded", latency: "280ms" },
      { name: "Storage Bucket", status: "online", latency: "65ms" },
      { name: "Realtime API", status: "online", latency: "140ms" },
    ],
  },

  systemLogs: [
    {
      id: "log_1001",
      timestamp: "2025-11-07T10:22:13Z",
      level: "info",
      message: "New client 'InnovateX Corp' added successfully.",
      source: "Client Service",
    },
    {
      id: "log_1002",
      timestamp: "2025-11-07T09:58:44Z",
      level: "warning",
      message: "Email service latency exceeded threshold (280ms).",
      source: "Notification Service",
    },
    {
      id: "log_1003",
      timestamp: "2025-11-07T09:45:02Z",
      level: "error",
      message: "AI conversation endpoint timeout for client 'NextEra AI'.",
      source: "AI Engine",
    },
    {
      id: "log_1004",
      timestamp: "2025-11-07T09:30:51Z",
      level: "info",
      message: "System health check passed all services.",
      source: "Health Monitor",
    },
    {
      id: "log_1005",
      timestamp: "2025-11-07T09:15:29Z",
      level: "info",
      message: "Database backup completed successfully.",
      source: "Database Service",
    },
  ],
}];
