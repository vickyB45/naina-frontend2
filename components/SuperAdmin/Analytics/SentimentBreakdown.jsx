"use client";

import * as React from "react";
import { Pie, PieChart, Label, Sector } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sentiment data (replace values if needed)
const sentimentData = [
  { sentiment: "Positive", value: 65, fill: "var(--chart-1)" },
  { sentiment: "Neutral", value: 25, fill: "var(--chart-2)" },
  { sentiment: "Negative", value: 10, fill: "var(--chart-3)" },
];

const chartConfig = {
  positive: { label: "Positive", color: "var(--chart-1)" },
  neutral: { label: "Neutral", color: "var(--chart-2)" },
  negative: { label: "Negative", color: "var(--chart-3)" },
};

export default function SentimentBreakdown() {
  const id = "sentiment-chart";
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Card
      data-chart={id}
      className=" flex flex-col"
    >
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="pb-0">
  <CardTitle className="text-lg font-semibold">
    Sentiment Breakdown
  </CardTitle>
  <p className="text-sm text-muted-foreground mt-1">
    User emotions across conversations — positive, neutral, and negative.
  </p>
</CardHeader>

      <CardContent className="flex flex-col items-center justify-center flex-1 pt-2">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[260px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={sentimentData}
              dataKey="value"
              nameKey="sentiment"
              innerRadius={60}
              strokeWidth={6}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 8} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 18}
                    innerRadius={outerRadius + 10}
                  />
                </g>
              )}
              onMouseEnter={(_, index) => setActiveIndex(index)}
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
                          className=" text-3xl dark:fill-white fill-black font-bold"
                        >
                          {sentimentData[activeIndex].value}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          className="fill-gray-500  text-sm"
                        >
                          {sentimentData[activeIndex].sentiment}
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
        <div className="flex gap-6 mt-6 text-sm">
          {sentimentData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="text-gray-500">{item.sentiment}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
