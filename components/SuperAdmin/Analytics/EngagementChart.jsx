"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


// 📊 Dummy Engagement Data
const chartData = [
  { date: "2024-04-01", aiChats: 222, siteVisits: 150 },
  { date: "2024-04-02", aiChats: 97, siteVisits: 180 },
  { date: "2024-04-03", aiChats: 167, siteVisits: 120 },
  { date: "2024-04-04", aiChats: 242, siteVisits: 260 },
  { date: "2024-04-05", aiChats: 373, siteVisits: 290 },
  { date: "2024-04-06", aiChats: 301, siteVisits: 340 },
  { date: "2024-04-07", aiChats: 245, siteVisits: 180 },
  { date: "2024-04-08", aiChats: 409, siteVisits: 320 },
  { date: "2024-04-09", aiChats: 59, siteVisits: 110 },
  { date: "2024-04-10", aiChats: 261, siteVisits: 190 },
  { date: "2024-04-11", aiChats: 327, siteVisits: 350 },
  { date: "2024-04-12", aiChats: 292, siteVisits: 210 },
  { date: "2024-04-13", aiChats: 342, siteVisits: 380 },
  { date: "2024-04-14", aiChats: 137, siteVisits: 220 },
  { date: "2024-04-15", aiChats: 120, siteVisits: 170 },
  { date: "2024-04-16", aiChats: 138, siteVisits: 190 },
  { date: "2024-04-17", aiChats: 446, siteVisits: 360 },
  { date: "2024-04-18", aiChats: 364, siteVisits: 410 },
  { date: "2024-04-19", aiChats: 243, siteVisits: 180 },
  { date: "2024-04-20", aiChats: 89, siteVisits: 150 },
  { date: "2024-04-21", aiChats: 137, siteVisits: 200 },
  { date: "2024-04-22", aiChats: 224, siteVisits: 170 },
  { date: "2024-04-23", aiChats: 138, siteVisits: 230 },
  { date: "2024-04-24", aiChats: 387, siteVisits: 290 },
  { date: "2024-04-25", aiChats: 215, siteVisits: 250 },
  { date: "2024-04-26", aiChats: 75, siteVisits: 130 },
  { date: "2024-04-27", aiChats: 383, siteVisits: 420 },
  { date: "2024-04-28", aiChats: 122, siteVisits: 180 },
  { date: "2024-04-29", aiChats: 315, siteVisits: 240 },
  { date: "2024-04-30", aiChats: 454, siteVisits: 380 },
  { date: "2024-05-01", aiChats: 165, siteVisits: 220 },
  { date: "2024-05-02", aiChats: 293, siteVisits: 310 },
  { date: "2024-05-03", aiChats: 247, siteVisits: 190 },
  { date: "2024-05-04", aiChats: 385, siteVisits: 420 },
  { date: "2024-05-05", aiChats: 481, siteVisits: 390 },
  { date: "2024-05-06", aiChats: 498, siteVisits: 520 },
  { date: "2024-05-07", aiChats: 388, siteVisits: 300 },
  { date: "2024-05-08", aiChats: 149, siteVisits: 210 },
  { date: "2024-05-09", aiChats: 227, siteVisits: 180 },
  { date: "2024-05-10", aiChats: 293, siteVisits: 330 },
  { date: "2024-05-11", aiChats: 335, siteVisits: 270 },
  { date: "2024-05-12", aiChats: 197, siteVisits: 240 },
  { date: "2024-05-13", aiChats: 197, siteVisits: 160 },
  { date: "2024-05-14", aiChats: 448, siteVisits: 490 },
  { date: "2024-05-15", aiChats: 473, siteVisits: 380 },
  { date: "2024-05-16", aiChats: 338, siteVisits: 400 },
  { date: "2024-05-17", aiChats: 499, siteVisits: 420 },
  { date: "2024-05-18", aiChats: 315, siteVisits: 350 },
  { date: "2024-05-19", aiChats: 235, siteVisits: 180 },
  { date: "2024-05-20", aiChats: 177, siteVisits: 230 },
  { date: "2024-05-21", aiChats: 82, siteVisits: 140 },
  { date: "2024-05-22", aiChats: 81, siteVisits: 120 },
  { date: "2024-05-23", aiChats: 252, siteVisits: 290 },
  { date: "2024-05-24", aiChats: 294, siteVisits: 220 },
  { date: "2024-05-25", aiChats: 201, siteVisits: 250 },
  { date: "2024-05-26", aiChats: 213, siteVisits: 170 },
  { date: "2024-05-27", aiChats: 420, siteVisits: 460 },
  { date: "2024-05-28", aiChats: 233, siteVisits: 190 },
  { date: "2024-05-29", aiChats: 78, siteVisits: 130 },
]


const chartConfig = {
  aiChats: {
    label: "AI Chats",
    color: "#8B5CF6", // violet-500
  },
  siteVisits: {
    label: "Website Engagements",
    color: "#60A5FA", // blue-400
  },
};

export default function EngagementChart() {
  const [timeRange, setTimeRange] = React.useState("7d");

  return (
    <Card className="border rounded-2xl shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div>
          <CardTitle className="text-lg font-semibold tracking-tight">
            Engagement Trend
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Compare AI Chat interactions vs site engagement over time
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-3 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillAI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillSite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              }
            />

            <Area
              type="monotone"
              dataKey="siteVisits"
              stroke="#60A5FA"
              fill="url(#fillSite)"
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="aiChats"
              stroke="#8B5CF6"
              fill="url(#fillAI)"
              strokeWidth={2.5}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}



