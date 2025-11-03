"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar, Users, MessageSquare, DollarSign, Bot } from "lucide-react";
import { ConversionChart } from "@/components/SuperAdmin/dashboard/ConversionChart";
import { StatsCard } from "@/components/SuperAdmin/dashboard/StatsCard";
import { TopClientsChart } from "@/components/SuperAdmin/dashboard/TopClientsChart";
import { SystemHealth } from "@/components/SuperAdmin/dashboard/SystemHealth";
import { ActivityFeed } from "@/components/SuperAdmin/dashboard/ActivityFeed";



export default function SuperAdminDashboard() {
  const [selectedRange, setSelectedRange] = useState("Last 7 days");

  // All Data States
  const [chartData, setChartData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [healthData, setHealthData] = useState({});
  const [activities, setActivities] = useState([]);

  // 🔄 Handle Range Change
  const handleRangeChange = (value) => {
    setSelectedRange(value);

    switch (value) {
      // 🟢 Last 7 Days
      case "Last 7 days":
        setChartData([
          { day: "Mon", volume: 120, conversion: 40 },
          { day: "Tue", volume: 150, conversion: 60 },
          { day: "Wed", volume: 200, conversion: 90 },
          { day: "Thu", volume: 250, conversion: 110 },
          { day: "Fri", volume: 230, conversion: 130 },
          { day: "Sat", volume: 280, conversion: 140 },
          { day: "Sun", volume: 260, conversion: 150 },
        ]);

        setStatsData([
          { title: "Total Clients", value: "1,240", change: "+1.2%", changeLabel: "vs last week", icon: Users, bgColor: "bg-purple-100" },
          { title: "AI Conversations", value: "84,120", change: "-3.5%", changeLabel: "vs last week", icon: MessageSquare, bgColor: "bg-blue-100" },
          { title: "Revenue Impact", value: "+18.4%", change: "+0.5%", changeLabel: "vs last week", icon: DollarSign, bgColor: "bg-green-100" },
          { title: "Active AI Agents", value: "24 / 28", change: "-1 agent", changeLabel: "vs last week", icon: Bot, bgColor: "bg-gray-100" },
        ]);

        setTopClients([
          { name: "InnovateX Corp", revenue: 420 },
          { name: "Alpha Solutions", revenue: 360 },
          { name: "Alpha Solutions", revenue: 360 },
          { name: "Alpha Solutions", revenue: 360 },
          { name: "TechNova", revenue: 290 },
        ]);

        setHealthData({
          uptime: "100%",
          latency: "45ms",
          dbConnections: "Optimal (34/100)",
        });

        setActivities([
          { type: "persona", message: "Client ABC updated AI Persona", time: "15m ago" },
          { type: "client", message: "New client added: InnovateX Corp", time: "2h ago" },
          { type: "system", message: "System backup completed", time: "4h ago" },
        ]);
        break;

      // 🟡 Last Month
      case "Last month":
        setChartData([
          { day: "Week 1", volume: 600, conversion: 150 },
          { day: "Week 2", volume: 720, conversion: 180 },
          { day: "Week 3", volume: 850, conversion: 230 },
          { day: "Week 4", volume: 900, conversion: 260 },
        ]);

        setStatsData([
          { title: "Total Clients", value: "1,520", change: "+3.2%", changeLabel: "vs last month", icon: Users, bgColor: "bg-purple-100" },
          { title: "AI Conversations", value: "1,24,800", change: "+8.5%", changeLabel: "vs last month", icon: MessageSquare, bgColor: "bg-blue-100" },
          { title: "Revenue Impact", value: "+24.6%", change: "+2.3%", changeLabel: "vs last month", icon: DollarSign, bgColor: "bg-green-100" },
            { title: "Active AI Agents", value: "24 / 28", change: "-1 agent", changeLabel: "vs last week", icon: Bot, bgColor: "bg-gray-100" },
        ]);

        setTopClients([
          { name: "NextGen Systems", revenue: 680 },
          { name: "TechNova", revenue: 540 },
          { name: "Clones", revenue: 430 },
          { name: "Clones", revenue: 430 },
          { name: "DigitalNest", revenue: 390 },
        ]);

        setHealthData({
          uptime: "99.8%",
          latency: "52ms",
          dbConnections: "Optimal (42/100)",
        });

       
        break;

      // 🔵 Last 6 Months
      case "Last 6 months":
        setChartData([
          { day: "May", volume: 800, conversion: 240 },
          { day: "Jun", volume: 900, conversion: 270 },
          { day: "Jul", volume: 950, conversion: 300 },
          { day: "Aug", volume: 1000, conversion: 350 },
          { day: "Sep", volume: 1100, conversion: 400 },
          { day: "Oct", volume: 1250, conversion: 450 },
        ]);

        setStatsData([
          { title: "Total Clients", value: "2,940", change: "+12.4%", changeLabel: "vs last 6 months", icon: Users, bgColor: "bg-purple-100" },
          { title: "AI Conversations", value: "5,84,320", change: "+20.2%", changeLabel: "vs last 6 months", icon: MessageSquare, bgColor: "bg-blue-100" },
          { title: "Revenue Impact", value: "+36.9%", change: "+4.5%", changeLabel: "vs last 6 months", icon: DollarSign, bgColor: "bg-green-100" },
           { title: "Active AI Agents", value: "24 / 28", change: "-1 agent", changeLabel: "vs last week", icon: Bot, bgColor: "bg-gray-100" },
        ]);

        setTopClients([
          { name: "TechNova", revenue: 1250 },
          { name: "Clones", revenue: 900 },
          { name: "NextGen Systems", revenue: 850 },
          { name: "InnovateX Corp", revenue: 780 },
          { name: "InnovateX Corp", revenue: 780 },
        ]);

        setHealthData({
          uptime: "99.9%",
          latency: "49ms",
          dbConnections: "Stable (40/100)",
        });

       
        break;

      // 🔴 Last Year
      case "Last year":
        setChartData([
          { day: "Q1", volume: 2000, conversion: 600 },
          { day: "Q2", volume: 2400, conversion: 800 },
          { day: "Q3", volume: 2600, conversion: 1000 },
          { day: "Q4", volume: 2900, conversion: 1300 },
        ]);

        setStatsData([
          { title: "Total Clients", value: "4,820", change: "+18.5%", changeLabel: "vs last year", icon: Users, bgColor: "bg-purple-100" },
          { title: "AI Conversations", value: "9,24,000", change: "+32.5%", changeLabel: "vs last year", icon: MessageSquare, bgColor: "bg-blue-100" },
          { title: "Revenue Impact", value: "+52.3%", change: "+8.2%", changeLabel: "vs last year", icon: DollarSign, bgColor: "bg-green-100" },
            { title: "Active AI Agents", value: "24 / 28", change: "-1 agent", changeLabel: "vs last week", icon: Bot, bgColor: "bg-gray-100" },
        ]);

        setTopClients([
          { name: "TechNova", revenue: 2300 },
          { name: "NextGen Systems", revenue: 2100 },
          { name: "InnovateX Corp", revenue: 1900 },
          { name: "Clones", revenue: 1600 },
          { name: "Clones", revenue: 1600 },
          { name: "Clones", revenue: 1600 },
          { name: "Clones", revenue: 1600 },
          { name: "Clones", revenue: 1600 },
        ]);

        setHealthData({
          uptime: "99.99%",
          latency: "40ms",
          dbConnections: "Excellent (50/100)",
        });

       
        break;
    }
  };

  // Load default range
  React.useEffect(() => {
    handleRangeChange(selectedRange);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-none shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-3xl font-bold mb-1">Welcome back, Vicky 👋</h1>
                <p className="text-gray-600">
                  Here's a quick look at AI system performance today.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Select value={selectedRange} onValueChange={handleRangeChange}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <SelectValue placeholder="Select Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                    <SelectItem value="Last month">Last month</SelectItem>
                    <SelectItem value="Last 6 months">Last 6 months</SelectItem>
                    <SelectItem value="Last year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConversionChart data={chartData} />
          <TopClientsChart clients={topClients} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SystemHealth healthData={healthData} />
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
