"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Chat Open", value: 90 },
  { name: "Product View", value: 65 },
  { name: "Add to Cart", value: 40 },
  { name: "Checkout", value: 25 },
  { name: "Purchase", value: 10 },
];

export default function DropOffChart() {
  // Detect dark mode using matchMedia
  const isDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div className="border rounded-xl p-4">
      <h2 className="font-medium mb-2">Drop-off Chart</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            formatter={(v) => `${v}%`}
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff", // dark:bg-gray-800 light:bg-white
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "8px",
              boxShadow: isDark
                ? "0 2px 6px rgba(255,255,255,0.05)"
                : "0 2px 6px rgba(0,0,0,0.1)",
            }}
            itemStyle={{
              color: isDark ? "#e5e7eb" : "#111827", // dark:text-gray-200 light:text-gray-900
            }}
            labelStyle={{
              color: isDark ? "#9ca3af" : "#6b7280", // label (xAxis name)
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
