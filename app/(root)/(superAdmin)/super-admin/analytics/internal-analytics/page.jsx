"use client";
import React, { useState } from "react";
import DashboardChips from "@/components/SuperAdmin/dashboard/DashboardChips";
import AvgConversionChart from "@/components/SuperAdmin/Internal Analytics/AvgConversionChart";
import TopClientsTable from "@/components/SuperAdmin/Internal Analytics/TopClientsTable";
import VkpChart from "@/components/SuperAdmin/Internal Analytics/VkpChart";

export default function InternalAnalyticsPage() {
  // 👇 view state
  const [view, setView] = useState("weekly");

  // ---- WEEKLY DATA ----
  const weeklyData = [
    { name: "Jul 16", value: 1.9 },
    { name: "Jul 18", value: 2.0 },
    { name: "Jul 21", value: 3.05 },
    { name: "Aug 02", value: 4.1 },
    { name: "Aug 12", value: 4.15 },
    { name: "Aug 21", value: 6.18 },
    { name: "Aug 22", value: 8.28 },
  ];

  const weeklyClients = [
    { name: "Solgarden", revenue: "₹96K" },
    { name: "Growthify", revenue: "₹82K" },
    { name: "BrandLink", revenue: "₹75K" },
  ];

  const weeklyDailyData = [
    { name: "Mon", value: 0.92 },
    { name: "Tue", value: 1.0 },
    { name: "Wed", value: 0.98 },
    { name: "Thu", value: 1.04 },
    { name: "Fri", value: 1.08 },
    { name: "Sat", value: 1.02 },
    { name: "Sun", value: 1.05 },
  ];

  // ---- MONTHLY DATA ----
  const monthlyData = Array.from({ length: 31 }, (_, i) => {
  const randomValue = 1 + Math.sin(i / 5) * 0.1 + Math.random() * 0.05;
  return {
    name: `${i + 1} Dec`,
    value: parseFloat(randomValue.toFixed(3)), // 🔹 only 3 decimal digits
  };
});

const monthlyClients = [
  { name: "Meta Ads", revenue: "₹290K" },
  { name: "Solgarden", revenue: "₹265K" },
  { name: "BrandLink", revenue: "₹240K" },
];

const monthlyDailyData = Array.from({ length: 31 }, (_, i) => {
  const value = 0.9 + Math.sin(i / 4) * 0.1 + Math.random() * 0.05;
  return {
    name: `${i + 1}`,
    value: parseFloat(value.toFixed(3)), // 🔹 rounded to 3 decimals
  };
});


  // ---- Conditional render based on view ----
  const chartData = view === "weekly" ? weeklyData : monthlyData;
  const clientData = view === "weekly" ? weeklyClients : monthlyClients;
  const vkpData = view === "weekly" ? weeklyDailyData : monthlyDailyData;

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Internal KPIs</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setView("monthly")}
              className={`px-3 py-1 text-sm rounded-md border transition ${
                view === "monthly"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "cursor-pointer"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setView("weekly")}
              className={`px-3 py-1 text-sm rounded-md border transition ${
                view === "weekly"
                  ? "bg-blue-600 text-white border-blue-600"
                  : " cursor-pointer"
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <DashboardChips
            heading="Avg AI Conversion Lift Across Clients"
            rate={view === "weekly" ? "1.18x" : "1.25x"}
            color="#10b981"
          />
          <DashboardChips
            heading="Monthly AI Revenue per Client"
            rate='₹300K'
            color="#1E88E5"
          />
          <DashboardChips
            heading="Intent Accuracy Rate"
            rate={view === "weekly" ? "72%" : "76%"}
            color="#8E24AA"
          />
          <DashboardChips
            heading="Avg time to Insights"
            rate={view === "weekly" ? "1.4h" : "1.2h"}
            color="#FFB300"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6">
          <div className="border rounded-xl p-4">
            <h2 className="font-medium mb-2">
              Avg Conversion Lift trend ({view === "weekly" ? "Weekly" : "Monthly"})
            </h2>
            <AvgConversionChart data={chartData} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-4">
            <div className="border rounded-xl p-4">
              <h2 className="font-medium mb-2">Top 10 Clients by AI Revenue</h2>
              <TopClientsTable clients={clientData} />
            </div>

            <div className="border rounded-xl p-4">
              <h2 className="font-medium mb-2">Plenstuinceen VKPs</h2>
              <VkpChart dailyData={vkpData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
