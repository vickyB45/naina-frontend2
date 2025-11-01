"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const DashboardAriaChart = () => {
  const chartData = [
    { date: "Apr 6", Chat: 120, Site: 85 },
    { date: "Apr 12", Chat: 160, Site: 100 },
    { date: "Apr 18", Chat: 90, Site: 60 },
    { date: "Apr 24", Chat: 190, Site: 120 },
    { date: "May 1", Chat: 250, Site: 170 },
    { date: "May 6", Chat: 210, Site: 140 },
    { date: "May 12", Chat: 300, Site: 200 },
    { date: "May 18", Chat: 260, Site: 180 },
    { date: "May 24", Chat: 320, Site: 210 },
    { date: "May 30", Chat: 280, Site: 190 },
    { date: "Jun 5", Chat: 340, Site: 220 },
    { date: "Jun 11", Chat: 310, Site: 200 },
    { date: "Jun 17", Chat: 360, Site: 240 },
    { date: "Jun 23", Chat: 300, Site: 210 },
    { date: "Jun 30", Chat: 350, Site: 230 },
  ];

  return (
    <div className="">
      {/* Chat vs Site AOV (Area Chart) */}
      <Card className="shadow-md border rounded-2xl px-0 ">
        <CardHeader>
          <CardTitle className="text-xl pb-4 border-b font-semibold ">
            Chat vs Site AOV Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorChat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSite" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #1f2937",
                  borderRadius: "8px",
                  color: "#f9fafb",
                }}
                labelStyle={{ color: "#9ca3af" }}
              />
              <Area
                type="monotone"
                dataKey="Chat"
                stroke="#3b82f6"
                fill="url(#colorChat)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Site"
                stroke="#10b981"
                fill="url(#colorSite)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span> Chat
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span> Site
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default DashboardAriaChart;
