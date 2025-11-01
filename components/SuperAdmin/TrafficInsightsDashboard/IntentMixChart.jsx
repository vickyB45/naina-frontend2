"use client";

import * as React from "react";
import { PieChart, Pie, Label, Sector } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function IntentMixChart({ data }) {
  const id = "intent-mix-chart";

  // Assign colors dynamically or fallback to default
  const COLORS = ["#FFB300", "#D55559", "#009689"];
  const chartData = data.map((item, i) => ({
    name: item.name,
    value: item.value,
    fill: COLORS[i] || "#94a3b8",
  }));

  const chartConfig = chartData.reduce(
    (acc, item, i) => ({
      ...acc,
      [item.name.toLowerCase().replace(/\s+/g, "_")]: {
        label: item.name,
        color: COLORS[i],
      },
    }),
    {}
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Card
      data-chart={id}
      className="relative border  shadow-sm hover:shadow-md transition-all duration-500 rounded-2xl overflow-hidden"
    >
      <ChartStyle id={id} config={chartConfig} />

      {/* Soft background */}
      <div className="absolute inset-0" />

      {/* Header */}
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-xl sm:text-2xl font-semibold ">
          Intent Mix
        </CardTitle>
      </CardHeader>

      {/* Chart Section */}
      <CardContent className="relative z-10 flex flex-col items-center justify-center pb-5">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[260px] sm:max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={5}
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 8} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 14}
                    innerRadius={outerRadius + 10}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl sm:text-3xl font-bold"
                        >
                          {chartData[activeIndex].value}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          className="fill-muted-foreground text-xs"
                        >
                          {chartData[activeIndex].name}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-col gap-2 w-full max-w-xs mt-3">
          {chartData.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2.5 rounded-lg transition-all text-sm ${
                index === activeIndex ? " shadow-sm" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="">{item.name}</span>
              </div>
              <span className="font-medium ">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
