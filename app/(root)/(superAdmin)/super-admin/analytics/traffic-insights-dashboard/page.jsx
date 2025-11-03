// TrafficInsightsDashboard.jsx
"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import LeaderboardTable from "@/components/SuperAdmin/TrafficInsightsDashboard/LeaderboardTable";
import IntentMixChart from "@/components/SuperAdmin/TrafficInsightsDashboard/IntentMixChart";
import { BarChart3, Copyright, DollarSign, Tag } from "lucide-react";

export default function TrafficInsightsDashboard() {
  const stats = [
    { icon: BarChart3, color: "#D55559", label: "Total Visitors", value: "5,300", change: "+12.5%" },
    { icon: Copyright, color: "#1E88E5", label: "High Intent %", value: "14%", change: "+2.3%" },
    { icon: DollarSign, color: "#8E24AA", label: "Revenue", value: "₹2.3L", change: "+18.2%" },
    { icon: Tag, color: "#FFB300", label: "Avg AOV ₹", value: "₹2,350", change: "+5.7%" },
  ];

  const leaderboardData = [
    { campaign: "Meta Ads", visitors: "5,300", highIntent: "14%", chatToPurchase: "8%", avgAov: "₹2,350" },
    { campaign: "Google Ads", visitors: "2,680", highIntent: "21%", chatToPurchase: "7%", avgAov: "₹1,980" },
    { campaign: "Email", visitors: "1,950", highIntent: "16%", chatToPurchase: "6%", avgAov: "₹2,100" },
    { campaign: "Social", visitors: "1,420", highIntent: "12%", chatToPurchase: "9%", avgAov: "₹1,800" },
  ];

  const intentData = [
    { name: "High Intent", value: 14 },
    { name: "Medium", value: 35 },
    { name: "Low Intent", value: 51 },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden sm:px-4">
      <Card className="shadow-lg  border-none backdrop-blur-sm w-full px-2 overflow-hidden">
        {/* Header */}
        <CardHeader className="space-y-1 px-4 pt-4">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl pb-1">Traffic & Intent Insights</CardTitle>
          <p className="text-sm text-gray-500">Real-time analytics dashboard for your campaigns</p>
        </CardHeader>

        {/* Stats Section */}
        <CardContent className="px-3 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                style={{ borderLeft: `4px solid ${stat.color}` }}
                className="group  overflow-hidden rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border"
              >
                <CardHeader className="flex items-center justify-between px-3 py-2 border-b ">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg">
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  </div>
                  <span className={`text-xs font-medium ${stat.change.includes("+") ? "text-green-600" : "text-red-600"}`}>{stat.change}</span>
                </CardHeader>

                <CardContent className="px-3">
                  <p style={{ color: stat.color }} className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">vs last period</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>

        {/* Leaderboard + Chart Section */}
        <CardContent className="px-0 sm:px-4">
          <div className="flex flex-col xl:flex-row w-full gap-3 xl:gap-4">
            <div className="w-full xl:w-[65%]">
              <LeaderboardTable data={leaderboardData} />
            </div>
            <div className="w-full xl:w-[32%]">
              <IntentMixChart data={intentData} />
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="text-xs sm:text-sm text-gray-500 border-t mt-4 sm:mt-6 px-3 sm:px-4">
          <div className="flex items-center justify-between w-full flex-wrap gap-2">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Last updated: Just now
            </p>
            <p className="text-[10px] sm:text-xs">Data refreshes every 5 minutes</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
