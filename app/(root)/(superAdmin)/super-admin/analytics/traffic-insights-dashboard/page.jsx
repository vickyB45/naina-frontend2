"use client";
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

// ------------------ Dummy Data ------------------
const stats = [
  {
    title: "Total Visits",
    value: "1.28M",
    change: "+12.4%",
    color: "#3b82f6",
    data: [
      { value: 200 },
      { value: 400 },
      { value: 600 },
      { value: 800 },
      { value: 700 },
      { value: 900 },
      { value: 1100 },
    ],
  },
  {
    title: "Avg. Session Time",
    value: "3m 25s",
    change: "+2.1%",
    color: "#10b981",
    data: [
      { value: 300 },
      { value: 320 },
      { value: 400 },
      { value: 450 },
      { value: 420 },
      { value: 460 },
      { value: 500 },
    ],
  },
  {
    title: "Bounce Rate",
    value: "38.5%",
    change: "-1.2%",
    color: "#ef4444",
    data: [
      { value: 700 },
      { value: 600 },
      { value: 650 },
      { value: 500 },
      { value: 550 },
      { value: 530 },
      { value: 520 },
    ],
  },
  {
    title: "Conversions",
    value: "4,120",
    change: "+18.2%",
    color: "#8b5cf6",
    data: [
      { value: 300 },
      { value: 400 },
      { value: 350 },
      { value: 500 },
      { value: 550 },
      { value: 650 },
      { value: 700 },
    ],
  },
];

const intentData = [
  { name: "High Intent", value: 45, color: "#10b981" },
  { name: "Medium Intent", value: 30, color: "#3b82f6" },
  { name: "Low Intent", value: 25, color: "#f59e0b" },
];

const trafficOverTime = [
  { name: "Mon", visits: 800 },
  { name: "Tue", visits: 1100 },
  { name: "Wed", visits: 950 },
  { name: "Thu", visits: 1250 },
  { name: "Fri", visits: 1400 },
  { name: "Sat", visits: 1000 },
  { name: "Sun", visits: 1350 },
];

const leaderboard = [
  { page: "/home", views: "198K", engagement: "65%" },
  { page: "/pricing", views: "155K", engagement: "74%" },
  { page: "/contact", views: "89K", engagement: "52%" },
  { page: "/blog", views: "72K", engagement: "60%" },
];

const aiEngagement = [
  { name: "Chat Opens", ai: 80, site: 60 },
  { name: "Product Views", ai: 65, site: 45 },
  { name: "Add to Cart", ai: 40, site: 30 },
  { name: "Checkout", ai: 25, site: 18 },
];

// ------------------ UI ------------------
export default function TrafficInsights() {
  return (
    <div className="min-h-screen p-6 lg:p-10 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold ">Traffic Insights</h1>
        <p className="text-gray-500 text-sm mt-1">Internal Analytics Overview</p>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
          >
            {/* Title */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                {stat.change}
              </span>
            </div>

            {/* Value + Chart */}
            <div className="flex justify-between items-center gap-2">
              <div className="mt-3 mb-2 text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div className="h-10 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stat.data}>
                    <defs>
                      <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={stat.color} stopOpacity={0.9} />
                        <stop offset="100%" stopColor={stat.color} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={stat.color}
                      strokeWidth={2}
                      fill={`url(#gradient-${i})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leaderboard Table */}
          <div className="rounded-2xl border  p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top Performing Pages</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="text-left pb-2">Page</th>
                  <th className="text-left pb-2">Views</th>
                  <th className="text-left pb-2">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((row, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="py-2">{row.page}</td>
                    <td>{row.views}</td>
                    <td>{row.engagement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Traffic Over Time */}
          <div className="rounded-2xl border  p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Traffic Over Time</h2>
            <div className="h-64">
<ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={trafficOverTime}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      {/* --- Gradient Background --- */}
      <defs>
        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor="#3b82f6"
            stopOpacity={0.4}
          />
          <stop
            offset="95%"
            stopColor="#3b82f6"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>

      {/* --- X & Y Axis --- */}
      <XAxis
        dataKey="name"
        stroke="currentColor"
        tick={{ fill: "currentColor", fontSize: 12 }}
        axisLine={{ stroke: "currentColor" }}
      />
      <YAxis
        stroke="currentColor"
        tick={{ fill: "currentColor", fontSize: 12 }}
        axisLine={{ stroke: "currentColor" }}
        tickFormatter={(val) => `${val / 1000}k`}
      />

      {/* --- Grid Lines --- */}
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="rgba(128,128,128,0.2)"
        vertical={false}
      />

      {/* --- Tooltip --- */}
      <Tooltip
        contentStyle={{
          backgroundColor:
            document.documentElement.classList.contains("dark")
              ? "rgba(255,255,255,0.05)"
              : "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.05)",
        }}
        labelStyle={{
          color: document.documentElement.classList.contains("dark")
            ? "#9ca3af"
            : "#6b7280",
          fontWeight: 600,
        }}
        itemStyle={{
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#111",
          fontWeight: 500,
        }}
        cursor={{ strokeDasharray: "3 3", stroke: "#3b82f6" }}
      />

      {/* --- Line --- */}
      <Line
        type="monotone"
        dataKey="visits"
        stroke="#3b82f6"
        strokeWidth={2.5}
        fillOpacity={1}
        fill="url(#colorVisits)"
        activeDot={{
          r: 6,
          fill: "#3b82f6",
          strokeWidth: 2,
          stroke: "#fff",
        }}
        dot={false}
        animationDuration={800}
        isAnimationActive={true}
      />
    </LineChart>
  </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Intent Mix Chart */}
          <div className="rounded-2xl border  p-5 shadow-sm">
            <h2 className="text-lg font-semibold ">Visitor Intent Mix</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={intentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {intentData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex justify-around mt-3 text-sm ">
              {intentData.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* AI vs Site Engagement */}
          <div className="rounded-2xl border  p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">AI vs Site Engagement</h2>
            <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
  <LineChart data={aiEngagement}>
    <XAxis
      dataKey="name"
      stroke="currentColor"
      tick={{ fill: "currentColor" }}
      axisLine={{ stroke: "currentColor" }}
    />
    <YAxis
      stroke="currentColor"
      tick={{ fill: "currentColor" }}
      axisLine={{ stroke: "currentColor" }}
    />

    {/* Tooltip Fix for Dark Mode */}
    <Tooltip
      contentStyle={{
        backgroundColor:
          document.documentElement.classList.contains("dark")
            ? "rgba(255,255,255,0.1)" // translucent white for dark mode
            : "#ffffff",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "8px",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#000000",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
      labelStyle={{
        color: document.documentElement.classList.contains("dark")
          ? "#d1d5db"
          : "#6b7280",
        fontWeight: 600,
      }}
      itemStyle={{
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#111",
        fontWeight: 500,
      }}
    />

    <Line
      type="monotone"
      dataKey="ai"
      stroke="#8b5cf6"
      strokeWidth={2}
    />
    <Line
      type="monotone"
      dataKey="site"
      stroke="#10b981"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
