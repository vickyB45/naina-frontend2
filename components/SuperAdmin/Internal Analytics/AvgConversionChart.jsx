"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";


export default function AvgConversionChart({data}) {
  return (
    <div
      className="h-56 w-full"
      role="img"
      fontSize="20px"
      aria-label="Average conversion rate trend chart showing growth from July to August"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis domain={[0.8, 1.2]} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "transparent",
              border: "1px solid ",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: 3, stroke: "#2563eb", strokeWidth: 1, fill: "white" }}
            aria-label="Conversion rate line"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
