import { Activity, AlertTriangle, Cpu, Server } from "lucide-react";

export const intentData = [
  { name: "High Intent", value: 45, color: "#10b981" },
  { name: "Medium Intent", value: 30, color: "#3b82f6" },
  { name: "Low Intent", value: 25, color: "#f59e0b" },
];

export const trafficOverTime = [
  {
    date: "Oct-24",
    visitors: 1240,
    pageViews: 3120,
    aiInteractions: 210,
    conversionRate: 4.2,
    bounceRate: 38,
    avgSessionDuration: "1m 46s",
  },
  {
    date: "Oct-25",
    visitors: 1380,
    pageViews: 3450,
    aiInteractions: 250,
    conversionRate: 4.5,
    bounceRate: 36,
    avgSessionDuration: "1m 52s",
  },
  {
    date: "Oct-26",
    visitors: 1450,
    pageViews: 3700,
    aiInteractions: 290,
    conversionRate: 4.8,
    bounceRate: 34,
    avgSessionDuration: "2m 01s",
  },
  {
    date: "Oct-27",
    visitors: 1520,
    pageViews: 4020,
    aiInteractions: 320,
    conversionRate: 5.0,
    bounceRate: 33,
    avgSessionDuration: "2m 08s",
  },
  {
    date: "Oct-28",
    visitors: 1610,
    pageViews: 4280,
    aiInteractions: 360,
    conversionRate: 5.4,
    bounceRate: 31,
    avgSessionDuration: "2m 14s",
  },
  {
    date: "Oct-29",
    visitors: 1690,
    pageViews: 4490,
    aiInteractions: 380,
    conversionRate: 5.6,
    bounceRate: 30,
    avgSessionDuration: "2m 17s",
  },
  {
    date: "Oct-30",
    visitors: 1740,
    pageViews: 4600,
    aiInteractions: 410,
    conversionRate: 5.9,
    bounceRate: 29,
    avgSessionDuration: "2m 22s",
  },
  {
    date: "Oct-31",
    visitors: 1820,
    pageViews: 4840,
    aiInteractions: 440,
    conversionRate: 6.1,
    bounceRate: 27,
    avgSessionDuration: "2m 25s",
  },
  {
    date: "Nov-01",
    visitors: 1920,
    pageViews: 5020,
    aiInteractions: 480,
    conversionRate: 6.4,
    bounceRate: 26,
    avgSessionDuration: "2m 30s",
  },
  {
    date: "Nov-02",
    visitors: 2050,
    pageViews: 5280,
    aiInteractions: 510,
    conversionRate: 6.6,
    bounceRate: 25,
    avgSessionDuration: "2m 36s",
  },
  {
    date: "Nov-03",
    visitors: 2140,
    pageViews: 5500,
    aiInteractions: 560,
    conversionRate: 6.9,
    bounceRate: 24,
    avgSessionDuration: "2m 40s",
  },
  {
    date: "Nov-04",
    visitors: 2280,
    pageViews: 5760,
    aiInteractions: 610,
    conversionRate: 7.2,
    bounceRate: 23,
    avgSessionDuration: "2m 46s",
  },
  {
    date: "Nov-05",
    visitors: 2400,
    pageViews: 6020,
    aiInteractions: 650,
    conversionRate: 7.5,
    bounceRate: 22,
    avgSessionDuration: "2m 49s",
  },
  {
    date: "Nov-06",
    visitors: 2550,
    pageViews: 6280,
    aiInteractions: 700,
    conversionRate: 7.9,
    bounceRate: 21,
    avgSessionDuration: "2m 55s",
  },
  {
    date: "Nov-07",
    visitors: 2690,
    pageViews: 6540,
    aiInteractions: 740,
    conversionRate: 8.2,
    bounceRate: 20,
    avgSessionDuration: "3m 02s",
  },
];


export const topPerforming = [
  {
    pageUrl: "/",
    pageTitle: "Home",
    views: 4520,
    uniqueVisitors: 3890,
    avgTimeOnPage: "1m 42s",
    conversionRate: 4.8,
    bounceRate: 36,
    aiInteractions: 620,
    lastUpdated: "Nov-07T10:10:00Z",
  },
  {
    pageUrl: "/pricing",
    pageTitle: "Pricing",
    views: 3810,
    uniqueVisitors: 3200,
    avgTimeOnPage: "2m 18s",
    conversionRate: 6.4,
    bounceRate: 28,
    aiInteractions: 510,
    lastUpdated: "Nov-07T10:12:00Z",
  },
  {
    pageUrl: "/solutions/ai-sales",
    pageTitle: "AI Sales Assistant",
    views: 2950,
    uniqueVisitors: 2570,
    avgTimeOnPage: "3m 04s",
    conversionRate: 8.2,
    bounceRate: 25,
    aiInteractions: 740,
    lastUpdated: "Nov-07T10:14:00Z",
  },
  {
    pageUrl: "/about",
    pageTitle: "About Us",
    views: 2120,
    uniqueVisitors: 1850,
    avgTimeOnPage: "1m 10s",
    conversionRate: 2.9,
    bounceRate: 48,
    aiInteractions: 180,
    lastUpdated: "Nov-07T10:18:00Z",
  },
  {
    pageUrl: "/contact",
    pageTitle: "Contact",
    views: 1740,
    uniqueVisitors: 1530,
    avgTimeOnPage: "2m 09s",
    conversionRate: 5.5,
    bounceRate: 33,
    aiInteractions: 410,
    lastUpdated: "Nov-07T10:22:00Z",
  },
];

export const aiEngagement = [
      { name: "Chat Opens", ai: 80, site: 60 },
      { name: "Product Views", ai: 65, site: 45 },
      { name: "Add to Cart", ai: 40, site: 30 },
      { name: "Checkout", ai: 25, site: 18 },
];



// System 

  export const stats = [
    {
      title: "Server Uptime",
      value: "99.98%",
      icon: <Server className="w-5 h-5 text-green-500" />,
      color: "from-green-500/20 to-green-500/5",
    },
    {
      title: "Active Agents",
      value: "32",
      icon: <Activity className="w-5 h-5 text-blue-500" />,
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      title: "API Health",
      value: "99.5%",
      icon: <Cpu className="w-5 h-5 text-purple-500" />,
      color: "from-purple-500/20 to-purple-500/5",
    },
    {
      title: "Errors",
      value: "3",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      color: "from-red-500/20 to-red-500/5",
    },
  ];


  // ---------------- Mock Data ----------------
  export const performanceData = [
    { time: "10:00", response: 120 },
    { time: "10:05", response: 110 },
    { time: "10:10", response: 150 },
    { time: "10:15", response: 100 },
    { time: "10:20", response: 130 },
    { time: "10:25", response: 90 },
    { time: "10:00", response: 120 },
    { time: "10:05", response: 110 },
    { time: "10:10", response: 150 },
    { time: "10:15", response: 100 },
    { time: "10:20", response: 130 },
    { time: "10:25", response: 90 },
  ];
  
  export const chartData = [
    { type: "CPU", usage: 45, fill: "var(--chart-1)" },
    { type: "Memory", usage: 30, fill: "var(--chart-2)" },
    { type: "Disk", usage: 25, fill: "var(--chart-3)" },
  ];
  
  export const chartConfig = {
    usage: { label: "Usage" },
    CPU: { label: "CPU", color: "var(--chart-1)" },
    Memory: { label: "Memory", color: "var(--chart-2)" },
    Disk: { label: "Disk", color: "var(--chart-3)" },
  };
  

  // system

  // logs 

  
export const MOCK_LOGS = [
  {
    id: "l1",
    level: "error",
    title: "Server timeout during sync",
    message: "Timeout while calling /sync with clientId=acme",
    service: "api",
    client: "Acme Corp",
    meta: { requestId: "req_123", status: 504 },
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "l2",
    level: "warning",
    title: "High API latency",
    message: "Average response time 2.5s (>2s threshold)",
    service: "api",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "l3",
    level: "success",
    title: "Backup completed",
    message: "Daily backup finished (size: 120MB)",
    service: "backup",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "l4",
    level: "info",
    title: "Agent retraining started",
    message: "Retraining model for client=travelsy",
    service: "agent",
    timestamp: new Date(Date.now() - 1000 * 30).toISOString(),
  },
];

export const LEVEL_COLORS = {
  error: "text-red-400 bg-red-900/30",
  warning: "text-amber-400 bg-amber-900/30",
  info: "text-sky-400 bg-sky-900/30",
  success: "text-emerald-400 bg-emerald-900/30",
};