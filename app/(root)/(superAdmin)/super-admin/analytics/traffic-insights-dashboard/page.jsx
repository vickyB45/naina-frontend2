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
  BarChart,
  CartesianGrid,
  Bar,
} from "recharts";
import { useSuperadminOverview, useTrendsAnalytics } from "@/hooks/query/superadminOverview";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { axiosBaseUrl } from "@/lib/axios";
import { aiEngagement } from "@/utils/helper";

// ==========================================
// SKELETON COMPONENTS
// ==========================================

/**
 * Skeleton loader for stat cards
 */
const StatCardSkeleton = () => (
  <div className="rounded-2xl border p-5 shadow-sm animate-pulse">
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
    </div>
    <div className="flex justify-between items-center gap-2 mt-3">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
    </div>
  </div>
);

/**
 * Skeleton loader for table rows
 */
const TableSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((i) => (
      <tr key={i} className="border-b animate-pulse">
        <td className="py-2 px-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </td>
        <td className="py-2 px-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </td>
        <td className="py-2 px-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </td>
        <td className="py-2 px-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </td>
        <td className="py-2 px-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </td>
      </tr>
    ))}
  </>
);

/**
 * Skeleton loader for chart containers
 */
const ChartSkeleton = () => (
  <div className="h-64 flex items-center justify-center animate-pulse">
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function TrafficInsights() {
  // ==========================================
  // 1️⃣ FETCH ANALYTICS DATA (Stats Cards)
  // ==========================================
  const { data: trendsData, isLoading: isTrendsLoading } = useTrendsAnalytics();
  const analytics = trendsData?.data;

  // Build stats array for the top cards
  const stats = analytics
    ? [
        {
          title: "Total Visits",
          value: analytics.totalVisitors ?? 0,
          change: "+0%",
          color: "#6366F1",
          data: [{ value: analytics.totalVisitors ?? 0 }],
        },
        {
          title: "Avg. Session Time",
          value: analytics.avgMessagesPerConversation ?? 0,
          change: "+0%",
          color: "#10B981",
          data: [{ value: analytics.avgMessagesPerConversation ?? 0 }],
        },
        {
          title: "Bounce Rate",
          value: analytics.chatOpenRate ?? 0,
          change: "+0%",
          color: "#F59E0B",
          data: [{ value: analytics.chatOpenRate ?? 0 }],
        },
        {
          title: "Conversions",
          value: analytics.conversionRate ?? 0,
          change: "+0%",
          color: "#EF4444",
          data: [{ value: analytics.conversionRate ?? 0 }],
        },
      ]
    : [];

  // ==========================================
  // 2️⃣ FETCH VISITOR INTENT DATA
  // ==========================================
  const { data: intentResponse, isLoading: isIntentLoading } = useSuperadminOverview();

  // Prepare intent data for pie chart
  const intentData = [
    {
      name: "High Intent",
      value: intentResponse?.data?.intentHigh ?? 0,
      color: "#10b981",
    },
    {
      name: "Medium Intent",
      value: intentResponse?.data?.intentMedium ?? 0,
      color: "#3b82f6",
    },
    {
      name: "Low Intent",
      value: intentResponse?.data?.intentLow ?? 0,
      color: "#f59e0b",
    },
  ];

  // ==========================================
  // 3️⃣ FETCH TOP PERFORMING PAGES
  // ==========================================
  const { data: topPages, isLoading: isPagesLoading } = useQuery({
    queryKey: ["top-performing-pages"],
    queryFn: () =>
      axiosBaseUrl
        .get(
          "https://naina-fullstack-backend-new.onrender.com/api/analytics/landing-exit-pages"
        )
        .then((res) => res.data.data.landingPages),
  });

  // ==========================================
  // 4️⃣ FETCH TRAFFIC OVER TIME
  // ==========================================
  const { data: trafficOverTimeData, isLoading: isTrafficLoading } = useQuery({
    queryKey: ["traffic-over-time"],
    queryFn: () =>
      axiosBaseUrl
        .get(
          "https://naina-fullstack-backend-new.onrender.com/api/analytics/traffic-calendar"
        )
        .then((res) => res.data.data),
  });

  // ==========================================
  // 5️⃣ HELPER: EXTRACT PAGE GROUP FROM URL
  // ==========================================
  /**
   * Extracts the first path segment from a URL to group pages
   * Example: https://example.com/products/123 → "products"
   */
  const getPageGroup = (url) => {
    try {
      const parsed = new URL(url);
      const path = parsed.pathname.replace(/^\/+|\/+$/g, ""); // Remove leading/trailing slashes

      if (!path) return "Home";
      return path.split("/")[0]; // Return first segment only
    } catch {
      return "Unknown";
    }
  };

  // ==========================================
  // 6️⃣ GROUP & AGGREGATE PAGES BY NAME
  // ==========================================
  /**
   * Groups multiple page URLs under same path and aggregates their stats
   * Example: /products/1, /products/2, /products/3 → "products" with combined stats
   */
  const groupedPages = {};

  (topPages || []).forEach((item) => {
    const group = getPageGroup(item.page);

    // Initialize group if doesn't exist
    if (!groupedPages[group]) {
      groupedPages[group] = {
        page: group,
        visits: 0,
        chatOpened: 0,
        chatEngaged: 0,
        rates: [], // Store all rates for averaging later
      };
    }

    // Accumulate stats
    groupedPages[group].visits += item.visits ?? 0;
    groupedPages[group].chatOpened += item.chatOpened ?? 0;
    groupedPages[group].chatEngaged += item.chatEngaged ?? 0;

    // Collect rates for average calculation
    if (item.chatOpenRate) {
      groupedPages[group].rates.push(Number(item.chatOpenRate));
    }
  });

  // ==========================================
  // 7️⃣ CREATE FINAL AGGREGATED ARRAY
  // ==========================================
  /**
   * Convert grouped object to array and calculate average open rates
   */
  const aggregatedPages = Object.values(groupedPages).map((grp) => ({
    page: grp.page,
    visits: grp.visits,
    chatOpened: grp.chatOpened,
    chatEngaged: grp.chatEngaged,
    chatOpenRate:
      grp.rates.length > 0
        ? (grp.rates.reduce((a, b) => a + b, 0) / grp.rates.length).toFixed(1)
        : "0.0",
  }));

  // Sort by visits (descending) and take top 5
  const top5Aggregated = aggregatedPages
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5);

  // ==========================================
  // 8️⃣ RENDER UI
  // ==========================================
  
  // Show full page loader if document is not ready (SSR scenario)
  if (typeof window !== "undefined" && document.readyState !== "complete") {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-6 lg:p-10 space-y-8">
      {/* ========== HEADER ========== */}
      <header>
        <h1 className="text-3xl font-bold">Traffic Insights</h1>
        <p className="text-gray-500 text-sm mt-1">Internal Analytics Overview</p>
      </header>

      {/* ========== STAT CARDS SECTION ========== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isTrendsLoading ? (
          // Show skeleton loaders while data is loading
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          // Render actual stat cards when data is available
          stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {/* Card Header */}
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

              {/* Card Body: Value + Mini Chart */}
              <div className="flex justify-between items-center gap-2">
                <div className="mt-3 mb-2 text-2xl font-semibold tracking-tight">
                  {stat.value}
                </div>

                {/* Mini Area Chart */}
                <div className="h-10 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stat.data}>
                      <defs>
                        <linearGradient
                          id={`gradient-${i}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={stat.color}
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor={stat.color}
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={stat.color}
                        strokeWidth={2}
                        fill={`url(#gradient-${i})`}
                        dot={false}
                        activeDot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========== MAIN GRID (2 COLUMNS) ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ========== LEFT COLUMN (2/3 WIDTH) ========== */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ===== TOP PERFORMING PAGES TABLE ===== */}
          <div className="rounded-2xl border p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top Performing Pages</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-700 dark:text-gray-300">
                  <th className="py-2 px-3 text-left">Page</th>
                  <th className="py-2 px-3 text-left">Visits</th>
                  <th className="py-2 px-3 text-left">Opened</th>
                  <th className="py-2 px-3 text-left">Engaged</th>
                  <th className="py-2 px-3 text-left">Open Rate %</th>
                </tr>
              </thead>

              <tbody>
                {isPagesLoading ? (
                  // Show skeleton rows while loading
                  <TableSkeleton />
                ) : top5Aggregated.length > 0 ? (
                  // Render actual data rows
                  top5Aggregated.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                    >
                      <td className="py-2 px-3 font-medium text-gray-800 dark:text-gray-100">
                        {row.page}
                      </td>
                      <td className="px-3">{row.visits}</td>
                      <td className="px-3">{row.chatOpened}</td>
                      <td className="px-3">{row.chatEngaged}</td>
                      <td className="px-3">{row.chatOpenRate}%</td>
                    </tr>
                  ))
                ) : (
                  // Empty state
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ===== TRAFFIC OVER TIME BAR CHART ===== */}
          <div className="rounded-2xl border p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Traffic Over Time</h2>

            {isTrafficLoading ? (
              // Show skeleton while loading
              <ChartSkeleton />
            ) : (
              // Render actual bar chart
              <div className="h-64">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trafficOverTimeData ?? []}>
                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient
                        id="colorVisitors"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#ab82f6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>

                      <linearGradient
                        id="colorPageViews"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(128,128,128,0.2)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="date"
                      stroke="currentColor"
                      tick={{ fill: "currentColor", fontSize: 12 }}
                    />

                    <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />

                    <Tooltip />

                    {/* Chat Opened Bar */}
                    <Bar
                      dataKey="chatOpened"
                      fill="url(#colorVisitors)"
                      radius={[6, 6, 0, 0]}
                      barSize={16}
                    />

                    {/* Visits Bar */}
                    <Bar
                      dataKey="visits"
                      fill="url(#colorPageViews)"
                      radius={[6, 6, 0, 0]}
                      barSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* ========== RIGHT COLUMN (1/3 WIDTH) ========== */}
        <div className="space-y-6">
          
          {/* ===== VISITOR INTENT MIX PIE CHART ===== */}
          <div className="rounded-2xl border p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Visitor Intent Mix</h2>

            {isIntentLoading ? (
              // Show skeleton while loading
              <ChartSkeleton />
            ) : (
              <>
                {/* Pie Chart */}
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
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <ul className="flex justify-around mt-3 text-sm">
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
              </>
            )}
          </div>

          {/* ===== AI VS SITE ENGAGEMENT LINE CHART ===== */}
          <div className="rounded-2xl border p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">AI vs Site Engagement</h2>

            {/* Note: Using static data from utils/helper - no API yet */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aiEngagement}>
                  <XAxis dataKey="name" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip />
                  
                  {/* AI Engagement Line */}
                  <Line
                    type="monotone"
                    dataKey="ai"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                  
                  {/* Site Engagement Line */}
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