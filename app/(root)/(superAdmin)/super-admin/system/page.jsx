"use client";

import React from "react";
import { motion } from "framer-motion";
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
  Activity,
  Cpu,
  AlertTriangle,
  Server,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "@/components/Loader";
import { getSystemOverview } from "@/lib/system/system";

// Pie colors
const RESOURCE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

export default function SystemOverview() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSystemOverview();
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch system overview", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (!data)
    return <div className="p-6 text-red-500">Failed to load system data</div>;

  const { summary, performanceMetrics, systemUsage, _meta, logs } = data;

  // -----------------------
  // Top Cards
  // -----------------------
  const stats = [
    {
      title: "Server Uptime",
      value: `${summary.serverUptime}%`,
      icon: <Server className="w-5 h-5 text-blue-500" />,
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      title: "Active Agents",
      value: summary.activeAgents,
      icon: <Activity className="w-5 h-5 text-green-500" />,
      color: "from-green-500/20 to-green-600/10",
    },
    {
      title: "API Health",
      value: `${summary.apiHealth}%`,
      icon: <Cpu className="w-5 h-5 text-yellow-500" />,
      color: "from-yellow-500/20 to-yellow-600/10",
    },
    {
      title: "Errors (24h)",
      value: summary.errors,
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      color: "from-red-500/20 to-red-600/10",
    },
  ];

  // -----------------------
  // Charts Data
  // -----------------------
  const barData = performanceMetrics.map((item) => ({
    time: item.time,
    response: item.value,
  }));

  const pieData = [
    { type: "CPU", usage: systemUsage.cpu },
    { type: "Memory", usage: systemUsage.memory },
    { type: "Disk", usage: systemUsage.disk },
  ];

  const totalUsage = systemUsage.totalLoad;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">System Overview</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date(_meta.fetchedAt).toLocaleTimeString()}
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.03 }}>
            <Card
              className={`bg-linear-to-br ${item.color} border border-border/40 shadow-md`}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="border border-border/50 shadow-xl">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Performance Metrics
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              Avg API latency
            </span>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} barSize={24}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="response"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Resource Usage */}
        <Card className="border border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              System Resource Usage
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mx-auto aspect-square max-h-62.5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={pieData}
                    dataKey="usage"
                    nameKey="type"
                    innerRadius={60}
                    startAngle={90}
                    endAngle={450}
                  >
                    {pieData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={RESOURCE_COLORS[i % RESOURCE_COLORS.length]}
                      />
                    ))}
                    <Label
                      content={({ viewBox }) => (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan className="text-3xl font-bold">
                            {totalUsage}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy + 22}
                            className="text-sm"
                          >
                            Total Load
                          </tspan>
                        </text>
                      )}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Section */}
      <Card className="border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent System Logs
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!logs || logs.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-6">
              No system logs found
            </div>
          ) : (
            <ul className="space-y-2 text-sm">
              {logs.map((log, idx) => (
                <li
                  key={idx}
                  className={
                    log.level === "error"
                      ? "text-red-500"
                      : log.level === "warning"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }
                >
                  <span className="mr-2">
                    {log.level === "error" && "❌"}
                    {log.level === "warning" && "⚠️"}
                    {log.level === "info" && "ℹ️"}
                  </span>
                  {log.message}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({new Date(log.createdAt).toLocaleTimeString()})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
