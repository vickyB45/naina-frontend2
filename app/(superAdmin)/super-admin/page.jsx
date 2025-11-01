import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardChips from "@/components/SuperAdmin/dashboard/DashboardChips";
import DashboardAriaChart from "@/components/SuperAdmin/dashboard/DashboardAriaChart";
import { DashboardPieChart } from "@/components/SuperAdmin/dashboard/DashboardPieChart";

 const chipContent = [
  {
    heading: "AI-Influenced Revenue (₹)",
    rate: "₹5,25,000",
    growth: "+12.5%",
    description: "Total revenue from orders where AI initiated add-to-cart or checkout.",
    color: "#10b981",
  },
  {
    heading: "AI Conversion Rate",
    rate: "12.4%",
    growth: "+8.2%",
    description: "% of users who chatted and completed a purchase.",
    color: "#1E88E5",
  },
  {
    heading: "Conversion Lift",
    rate: "1.8x",
    growth: "-1.6%",
    description: "AI-user conversion vs. overall site conversion.",
    color: "#00ACC1",
  },
  {
    heading: "Chat Engagement Rate",
    rate: "28%",
    growth: "+10.3%",
    description: "% of site visitors who opened and chatted. Includes Unique & Repeat Chats.",
    color: "#8E24AA",
  },
  {
    heading: "Avg Chat Duration",
    rate: "3m 42s",
    growth: "+6.9%",
    description: "Average time spent chatting with AI.",
    color: "#FFB300",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Card className="shadow-lg border-none  backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl  pb-3 sm:pb-4 border-b border-gray-200">
            Overview - Naina Performance Snapshot
          </CardTitle>
        </CardHeader>

        <CardContent className=" sm:px-4">
          <div
            className="
              grid 
              grid-cols-1     
              sm:grid-cols-2      
              md:grid-cols-3 
              2xl:grid-cols-5
              gap-2 sm:gap-4 lg:gap-6  
            "
          >
            {chipContent.map((item, index) => (
              <DashboardChips
                key={index}
                heading={item.heading}
                rate={item.rate}
                description={item.description}
                color={item.color}
                growth={item.growth}
                index={index}
              />
            ))}
          </div>
        </CardContent>
        <CardContent className="px-0 sm:px-4">
          <div
            className="
              flex xl:flex-row flex-col w-full   
              gap-2 xl:gap-4 
            "
          >
          <div className="w-full xl:w-[70%] ">
            <DashboardAriaChart  />
          </div>
          <div className="w-full xl:w-[30%] ">
            <DashboardPieChart  />
          </div>
          </div>
        </CardContent>
        

        <CardFooter className="text-xs sm:text-sm text-gray-500 border-t mt-4 sm:mt-6 px-2 sm:px-4">
          <div className="flex items-center justify-between w-full flex-wrap gap-2">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Last updated: Just now
            </p>
            <p className="text-[10px] sm:text-xs">Data refreshes every 5 minutes</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
