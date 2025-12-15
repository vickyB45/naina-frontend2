export const recentActivityFeed = [
  {
    id: "act_2001",
    type: "client_added",
    timestamp: "2025-11-07T09:58:23Z",
    user: "Superadmin",
    message: "New client 'NextEra AI' has been successfully onboarded.",
    details: {
      clientId: "cli_9821",
      companyName: "NextEra AI",
      plan: "Enterprise",
      addedBy: "Vicky (Superadmin)",
    },
  },
  {
    id: "act_2002",
    type: "plan_upgrade",
    timestamp: "2025-11-07T09:40:52Z",
    user: "Arush Sharma",
    message: "Client 'InnovateX Corp' upgraded plan from Starter → Growth.",
    details: {
      clientId: "cli_6732",
      previousPlan: "Starter",
      newPlan: "Growth",
      effectiveDate: "2025-11-08",
    },
  },
  {
    id: "act_2003",
    type: "api_alert",
    timestamp: "2025-11-07T09:25:10Z",
    user: "System Monitor",
    message: "High API latency detected on 'AI Conversation Endpoint'.",
    details: {
      affectedService: "AI Engine",
      latency: "780ms",
      threshold: "400ms",
      severity: "warning",
    },
  },
  {
    id: "act_2004",
    type: "data_backup",
    timestamp: "2025-11-07T09:00:44Z",
    user: "System",
    message: "Database backup completed successfully.",
    details: {
      backupSize: "2.4GB",
      duration: "3m 22s",
      storageLocation: "us-east-1/backup-2025-11-07",
    },
  },
  {
    id: "act_2005",
    type: "support_ticket",
    timestamp: "2025-11-07T08:47:18Z",
    user: "Kashitrip Admin",
    message:
      "Support ticket #3921 resolved: 'Bot not responding on checkout page'.",
    details: {
      ticketId: "#3921",
      resolvedBy: "Naina (AI Support Agent)",
      resolutionTime: "18m",
    },
  },
  {
    id: "act_2006",
    type: "ai_model_update",
    timestamp: "2025-11-07T08:25:37Z",
    user: "System AI Manager",
    message: "AI model 'Naina-v3.2' deployed successfully.",
    details: {
      modelVersion: "v3.2",
      changes: ["Improved context retention", "Faster query responses"],
      rolloutStatus: "completed",
    },
  },
];
