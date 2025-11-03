"use client";
import React from "react";
import { Clock, Eye, MessageCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const TopEngagementPages = () => {
  const pages = [
    {
      name: "Homepage",
      views: "80K",
      time: "2:05",
      interactions: "5K",
      sentiment: "Negative",
      color: "#f87171",
    },
    {
      name: "Product Page",
      views: "60K",
      time: "8:15",
      interactions: "3.5K",
      sentiment: "Neutral",
      color: "#facc15",
    },
    {
      name: "About",
      views: "45K",
      time: "1:25",
      interactions: "2.3K",
      sentiment: "Positive",
      color: "#4ade80",
    },
    {
      name: "FAQ",
      views: "20K",
      time: "0:15",
      interactions: "1.1K",
      sentiment: "Negative",
      color: "#f87171",
    },
  ];

  return (
    <Card className="rounded-2xl border p-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Top Engagement Pages
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Discover which pages your visitors engage with most.
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {pages.map((page, idx) => (
            <div
              key={idx}
              className="p-5 border transition-all duration-300 rounded-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-base">{page.name}</h4>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${page.color}25`,
                    color: page.color,
                  }}
                >
                  {page.sentiment}
                </span>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>{page.views}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{page.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{page.interactions}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width:
                      idx === 0
                        ? "90%"
                        : idx === 1
                        ? "70%"
                        : idx === 2
                        ? "50%"
                        : "30%",
                    backgroundColor: page.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopEngagementPages;
