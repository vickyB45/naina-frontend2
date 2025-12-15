
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ConversionChart } from "@/components/SuperAdmin/dashboard/ConversionChart";
import { StatsCard } from "@/components/SuperAdmin/dashboard/StatsCard";
import { TopClientsChart } from "@/components/SuperAdmin/dashboard/TopClientsChart";
import { SystemHealth } from "@/components/SuperAdmin/dashboard/SystemHealth";
import { ActivityFeed } from "@/components/SuperAdmin/dashboard/ActivityFeed";

import { superAdminData } from "@/utils/api/dashboard/superadmin";

// 🆕 Import overview API hook
import { useSuperadminOverview } from "@/hooks/query/superadminOverview";

// Icons
import {
  Users,
  MessageCircle,
  Activity,
  TrendingUp,
} from "lucide-react";
import Loader from "@/components/Loader";

export default function SuperAdminDashboard() {
  // 🆕 Fetch backend analytics overview
  const { data, isLoading, error } = useSuperadminOverview();

if (isLoading)
  return (
    <Loader/>
  );

  if (error) return <div className="p-6 text-red-500">Error loading overview</div>;

  const overview = data?.data;

  // 🆕 Dynamic dashboard card data (Backend + UI props)
  const dashboardChip = [
    {
      title: "Total Visitors",
      value: overview?.totalVisitors || 0,
      // change: overview.visitorToConversionRate + "%",
      changeLabel: "Visitors → Conversion Rate",
      bgColor: "bg-blue-100",
      icon: Users,
    },
   {
  title: "Avg Messages per Chat",
  value: overview?.avgMessagesPerSession || 0,
  changeLabel: "Messages per Conversation",
  bgColor: "bg-green-100",
  icon: MessageCircle,
},

    {
      title: "Active Chats",
      value: overview?.activeChats || 0,
      // change: overview.chatEngagementRate + "%",
      changeLabel: "Engagement Rate",
      bgColor: "bg-yellow-100",
      icon: Activity,
    },
    {
      title: "Conversion Rate",
      value: overview?.conversionRate + "%" || 0,
      // change: overview.chatOpenRate + "%",
      changeLabel: "Chat Open Rate",
      bgColor: "bg-purple-100",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen md:p-6 p-2">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <Card className="border-none shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  Welcome back, {superAdminData?.name} 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Here's a quick look at AI system performance today.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🆕 Dynamic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardChip.map((data, index) => (
            <StatsCard key={index} {...data} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConversionChart  />
          <TopClientsChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SystemHealth />
          <ActivityFeed />
        </div>

      </div>
    </div>
  );
}
