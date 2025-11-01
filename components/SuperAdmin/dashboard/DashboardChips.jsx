'use client'
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const DashboardChips = ({ heading, rate, description, index, color, growth }) => {
  // ✅ Check if growth starts with "-"
  const isNegative = typeof growth === "string" && growth.trim().startsWith("-");

  // ✅ Decide color based on growth sign
  const growthColor = isNegative ? "#EF4444" : "#10B981"; // red or green

  return (
    <div
      className={`p-5 rounded-2xl shadow-sm border-1 hover:shadow-md transition-all duration-300 h-full flex flex-col border-l-4`}
      style={{
        borderLeftColor: color,
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-[17px] font-[500] text-gray-700 dark:text-white leading-tight">
            {heading}
          </h3>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p
          className="text-3xl my-2 font-[500] tracking-tight text-gray-900 dark:text-white transition-transform duration-300"
          style={{ color }}
        >
          {rate}
        </p>

        {/* ✨ Only growth glow animation */}
        <motion.div
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.03, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center text-center gap-1 text-sm font-semibold"
          style={{
            color: growthColor,
          }}
        >
          <ArrowUpRight className={`w-4 h-4 ${isNegative ? "rotate-180" : ""}`} />
          {growth}
        </motion.div>
      </div>

      <p className="text-gray-600 dark:text-white leading-relaxed mt-2 border-t pt-3 text-xs">
        {description}
      </p>
    </div>
  );
};

export default DashboardChips;
