"use client";
import DashboardChips from "@/components/SuperAdmin/dashboard/DashboardChips";
import DropOffChart from "@/components/SuperAdmin/EngagementBehavior/DropOffChart";
import FunnelChart from "@/components/SuperAdmin/EngagementBehavior/FunnelChart";
import React from "react";

const stats = [
    {
        label: "Chat Start Rate", value: "45%", color: "#1E88E5",
    },
    {
        label: "Avg Messages per Chat", value: "6.8", color: "#8E24AA",
    },
    {
        label: "Product Click Rate", value: "20%", color: "#aE24ba",
    },
    {
        label: "Add-to-Cart via AI", value: "12%", color: "#00ACC1",
    },
    {
        label: "FAQ Resolution", value: "65%", color: "#FFB300",
    },
];

export default function EngagementBehaviorPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold">Engagement & Behavior</h1>
            <p className="text-gray-500 mb-6">
                Goal: Understand how users interact with the AI ad where they drop off
            </p>

            {/* <DashboardChips heading={} /> */}
            <div className="grid 
              grid-cols-1     
              sm:grid-cols-2      
              md:grid-cols-4
              gap-2 sm:gap-4 mb-4 ">
                {stats.map((stat, index) => (
                    <DashboardChips key={index} color={stat.color} heading={stat.label} rate={stat.value} />
                ))}
            </div>

            <div className="flex justify-center items-center md:flex-row flex-col w-full gap-4">
                <div className="w-full md:w-[35%]">
                    <FunnelChart />
                </div>
                <div className="w-full md:w-[62%]">
                    <DropOffChart />
                </div>
                
            </div>
        </div>
    );
}
