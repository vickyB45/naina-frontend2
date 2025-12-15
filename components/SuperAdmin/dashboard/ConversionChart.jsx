"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "@/components/Loader";
import { useTrendsData } from "@/hooks/query/superadminOverview";

export const ConversionChart = ({ timeRange = "7d" }) => {
  const { data, isLoading } = useTrendsData(timeRange);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartData = React.useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) {
      return [];
    }

    return data.data.map((item) => {
      const date = new Date(item.date);
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });

      return {
        day: formattedDate,
        volume: Number(item.chatVolume) || 0,
        messages: Number(item.totalMessages) || 0,
        conversion: Number(item.conversionRate) || 0,
      };
    });
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Card className="border-none shadow-sm">
        <CardHeader className="px-4 py-3 md:px-6 md:py-4">
          <CardTitle className="text-base md:text-lg font-semibold">
            Chat Volume vs Conversion
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <div className="h-72 flex items-center justify-center text-gray-500">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-base md:text-lg font-semibold">
          Chat Volume vs Conversion
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2 md:px-6">
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ 
                top: 10, 
                right: isMobile ? 5 : 40, 
                left: isMobile ? -20 : 10, 
                bottom: isMobile ? 40 : 60 
              }}
            >
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                vertical={false}
              />

              <XAxis
                dataKey="day"
                tick={{ fontSize: isMobile ? 9 : 11, fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                angle={-45}
                textAnchor="end"
                height={isMobile ? 40 : 60}
              />

              <YAxis
                yAxisId="left"
                tick={{ fontSize: isMobile ? 9 : 11, fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                width={isMobile ? 35 : 60}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: isMobile ? 9 : 11, fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                tickFormatter={(value) => `${value}%`}
                width={isMobile ? 30 : 60}
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "Conversion Rate") {
                    return [`${Number(value).toFixed(1)}%`, name];
                  }
                  return [Number(value).toLocaleString(), name];
                }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  padding: isMobile ? "6px 8px" : "8px 12px",
                  fontSize: isMobile ? "10px" : "12px",
                }}
                labelStyle={{ 
                  color: "#111827", 
                  fontWeight: "600",
                  marginBottom: "4px"
                }}
              />

              <Legend 
                wrapperStyle={{ 
                  paddingTop: isMobile ? "8px" : "16px",
                  fontSize: isMobile ? "10px" : "12px"
                }}
                iconType="line"
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="volume"
                stroke="#3b82f6"
                fill="url(#colorVolume)"
                strokeWidth={isMobile ? 1.5 : 2}
                name="Chat Volume"
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="messages"
                stroke="#f59e0b"
                fill="url(#colorMessages)"
                strokeWidth={isMobile ? 1.5 : 2}
                name="Total Messages"
              />

              <Area
                yAxisId="right"
                type="monotone"
                dataKey="conversion"
                stroke="#22c55e"
                fill="url(#colorConversion)"
                strokeWidth={isMobile ? 1.5 : 2}
                name="Conversion Rate"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-[10px] md:text-xs text-gray-500 text-center mt-2 md:mt-4">
          Daily chat volume, messages & conversion rate ({timeRange})
        </p>
      </CardContent>
    </Card>
  );
};