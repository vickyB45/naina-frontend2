"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Activity,
  Cpu,
  AlertTriangle,
  Server,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ---------------- Mock Data ----------------
const performanceData = [
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

const chartData = [
  { type: "CPU", usage: 45, fill: "var(--chart-1)" },
  { type: "Memory", usage: 30, fill: "var(--chart-2)" },
  { type: "Disk", usage: 25, fill: "var(--chart-3)" },
];

const chartConfig = {
  usage: { label: "Usage" },
  CPU: { label: "CPU", color: "var(--chart-1)" },
  Memory: { label: "Memory", color: "var(--chart-2)" },
  Disk: { label: "Disk", color: "var(--chart-3)" },
};

// ------------------------------------------------------
export default function SystemOverview() {
  const totalUsage = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.usage, 0);
  }, []);

  const stats = [
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">System Overview</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: 2 mins ago ⟳
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.03 }}>
            <Card
              className={`bg-gradient-to-br ${item.color} border border-border/40 shadow-md`}
            >
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="relative overflow-hidden border border-border/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 animate-pulse blur-2xl opacity-40" />
          <CardHeader className="relative z-10 flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
              Performance Metrics
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              Live Data • 30s refresh
            </span>
          </CardHeader>

          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={performanceData}
                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                barSize={24}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="90%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="response"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Resource Usage */}
        <Card className="relative overflow-hidden border border-border/50 shadow-xl ">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 animate-pulse blur-2xl opacity-30" />
          <CardHeader className="relative z-10 flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
              System Resource Usage
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              Real-time • Auto-updating
            </span>
          </CardHeader>

          <CardContent className="flex-1 pb-0 relative z-10">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      className=" border-slate-700"
                      hideLabel
                    />
                  }
                />
                <Pie
                  data={chartData}
                  dataKey="usage"
                  nameKey="type"
                  innerRadius={60}
                  strokeWidth={5}
                  cornerRadius={8}
                  startAngle={90}
                  endAngle={450}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="dark:fill-white text-3xl font-bold"
                            >
                              {totalUsage}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className=" text-sm"
                            >
                              Total Load
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card className="border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li className="text-green-500">
              ✅ Backup completed successfully (2h ago)
            </li>
            <li className="text-yellow-500">
              ⚠️ API latency increased at 12:02 PM
            </li>
            <li className="text-blue-500">🔁 Auto-recovery executed</li>
            <li className="text-red-500">
              ❌ 2 requests failed during peak hours
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
