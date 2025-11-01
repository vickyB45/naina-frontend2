"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function TopClientsTable({clients}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border   backdrop-blur-sm p-2"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left  border-b">
            <th className="pb-2 font-medium">Client</th>
            <th className="pb-2 font-medium text-right">AI Revenue</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c, i) => (
            <motion.tr
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="dark:hover:bg-zinc-800  hover:bg-zinc-200  transition-colors cursor-pointer group"
            >
              <td className="py-2 font-medium  flex items-center gap-2">
                <TrendingUp
                  size={16}
                  className="text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity"
                />
                {c.name}
              </td>
              <td className="py-2 text-right font-semibold ">
                {c.revenue}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
