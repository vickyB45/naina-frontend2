"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function InternalAnalytics() {
  // ====== STATES ======
  const [stats, setStats] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [agents, setAgents] = useState([]);
  const [logs, setLogs] = useState([]);
  const [health, setHealth] = useState([]);

  // ====== FUTURE API HOOK ======
  useEffect(() => {
    // in real use case, fetch from API:
    // fetch('/api/internal-analytics').then(res => res.json()).then(data => setStats(data.stats))
    setStats([
      { label: "Total Conversations", value: "1.2M", change: "+12%", color: "text-green-500" },
      { label: "Avg Response Time", value: "2.3s", change: "-0.1s", color: "text-blue-500" },
      { label: "Token Usage", value: "45.2K", change: "+5%", color: "text-yellow-500" },
      { label: "Active Agents", value: "128", change: "+2", color: "text-violet-500" },
    ]);

    setPerformanceData([
      { time: "10:00", latency: 300, apiCalls: 115, tokens: 45 },
      { time: "11:00", latency: 200, apiCalls: 122, tokens: 46 },
      { time: "12:00", latency: 200, apiCalls: 115, tokens: 84 },
      { time: "13:00", latency: 300, apiCalls: 101, tokens: 57.5 },
      { time: "14:00", latency: 800, apiCalls: 145, tokens: 89 },
      { time: "15:00", latency: 500, apiCalls: 150, tokens: 118 },
      { time: "16:00", latency: 1100, apiCalls: 142, tokens: 70 },
    ]);

    setAgents([
      { name: "SalesBot-1", business: "Kashitrip", time: "2.1s", status: "Active" },
      { name: "SupportBot", business: "Shopverse", time: "3.4s", status: "Slow" },
      { name: "HelpBot", business: "MediAssist", time: "5.6s", status: "Slow" },
      { name: "FinanceBot", business: "FinData", time: "8.0s", status: "Active" },
    ]);

    setLogs([
      "[11:04] AI Agent 'Shopverse' - Timeout (402ms)",
      "[10:57] MongoDB connection re-established",
      "[10:50] Server restarted successfully",
    ]);

    setHealth([
      { label: "CPU Usage", value: 55, color: "#3b82f6" },
      { label: "Memory Load", value: 68, color: "#ef4444" },
      { label: "Uptime", value: 99, color: "#10b981" },
    ]);
  }, []);

  return (
    <div className="min-h-screen  p-6 ">
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-4xl font-medium mb-2">Internal Analytics</h1>
        <p className="text-slate-400">System metrics and AI performance insights</p>
      </header>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 space-y-6">
          {/* === 1. TOP STATS === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50"
              >
                {/* Label */}
                <p className="text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </p>

                {/* Value */}
                <h2 className="text-3xl font-semibold mt-2 text-foreground">
                  {stat.value}
                </h2>

                {/* Change indicator */}
                <p
                  className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full ${stat.change.includes("+")
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                    }`}
                >
                  {stat.change}
                </p>
              </div>

            ))}
          </div>

          {/* === 2. PERFORMANCE LINE CHART === */}
          <Card className="">
            <CardHeader>
              <CardTitle>AI Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent className=" px-0 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="currentColor" tick={{ fill: "currentColor" }} />
                  <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30,41,59,0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "white" }} />
                  <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="apiCalls" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="tokens" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* === 3. AGENT PERFORMANCE TABLE === */}
         <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
  <CardHeader>
    <CardTitle className="text-lg font-semibold text-foreground">
      Agent Performance Snapshot
    </CardTitle>
    <p className="text-sm text-muted-foreground">
      Real-time overview of AI agent response and activity
    </p>
  </CardHeader>

  <CardContent>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
            <th className="py-3 px-4 text-left">Agent</th>
            <th className="py-3 px-4 text-left">Business</th>
            <th className="py-3 px-4 text-left">Avg RT</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {agents.map((a, i) => (
            <tr
              key={i}
              className="transition-colors hover:bg-muted/50 border-b border-border/50"
            >
              <td className="py-3 px-4 font-medium text-foreground">{a.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{a.business}</td>
              <td className="py-3 px-4 text-foreground">{a.time}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    a.status === "Active"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>

        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-5 space-y-6">
          {/* === 1. SYSTEM HEALTH === */}
          <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Platform Health Check
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Real-time server and system performance overview
              </p>
            </CardHeader>

            <CardContent className="flex justify-around items-center gap-4 py-6">
              {health.map((item, i) => {
                const circumference = 2 * Math.PI * 40;
                const offset = circumference * (1 - item.value / 100);

                return (
                  <div key={i} className="flex flex-col items-center space-y-3">
                    <svg viewBox="0 0 100 100" className="w-24 h-24">
                      {/* Background Track */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted stroke-current opacity-10"
                      />

                      {/* Progress Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="10"
                        fill="none"
                        stroke={item.color}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-700 ease-out"
                      />

                      {/* Value Text */}
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fill="currentColor"
                        className="text-base font-bold text-foreground"
                      >
                        {item.value}%
                      </text>
                    </svg>

                    {/* Label */}
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>


          {/* === 2. LOGS FEED === */}
         <Card className="max-h-[400px] overflow-y-auto border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
  <CardHeader className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
    <CardTitle className="text-lg font-semibold text-foreground">
      System Logs Feed
    </CardTitle>
    <p className="text-sm text-muted-foreground">
      Live activity and AI system events
    </p>
  </CardHeader>

  <CardContent>
    <ul className="space-y-2 text-sm font-mono">
      {logs.map((log, i) => (
        <li
          key={i}
          className={`rounded-lg p-2 border border-border/40 transition-colors duration-200 hover:bg-muted/50 ${
            log.toLowerCase().includes("error")
              ? "text-red-500"
              : log.toLowerCase().includes("warning")
              ? "text-yellow-500"
              : "text-foreground"
          }`}
        >
          <span className="opacity-70 mr-2">
            [{new Date().toLocaleTimeString()}]
          </span>
          {log}
        </li>
      ))}
    </ul>
  </CardContent>
</Card>

        </div>
      </div>
    </div>
  );
}
