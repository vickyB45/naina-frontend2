"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LeaderboardTable = ({ data }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <Card className="relative border shadow-sm hover:shadow-md transition-shadow duration-500 overflow-hidden rounded-2xl">
      {/* Background gradient */}
      <div className="absolute " />

      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between relative z-10 pb-2">
        <CardTitle className="text-2xl font-semibold ">
          Campaign Leaderboard
        </CardTitle>

        <Button
          className="shadow-sm text-white hover:shadow-md transition-all duration-300 transform hover:scale-[1.03]"
        >
          Export CSV
        </Button>
      </CardHeader>

      {/* Table */}
      <CardContent className="relative z-10 p-0">
        <div className="overflow-hidden rounded-b-2xl border-t ">
          <table className="w-full text-sm">
            <thead>
              <tr className=" border-b ">
                {["Campaign", "Visitors", "High Intent %", "Chat → Purchase %", "Avg AOV ₹"].map(
                  (header, idx) => (
                    <th
                      key={idx}
                      className="text-left p-4 font-semibold text-xs uppercase tracking-wide"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`transition-all duration-300 border-b  ${
                    hoveredRow === index
                      ? " shadow-sm scale-[1.01]"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="p-4 font-medium ">{row.campaign}</td>
                  <td className="p-4 font-medium">{row.visitors}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-xs">
                      {row.highIntent}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-xs">
                      {row.chatToPurchase}
                    </span>
                  </td>
                  <td className="p-4 font-semibold ">{row.avgAov}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTable;
