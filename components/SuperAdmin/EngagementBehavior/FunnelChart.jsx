"use client";
import React from "react";

export default function FunnelChart() {
  const steps = [
    "Chat Open",
    "Product View",
    "Add to Cart",
    "Checkout",
    "Purchase",
  ];

  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <h2 className="font-semibold mb-3">Funnel</h2>

      <div className="flex flex-col items-center w-full mt-2 space-y-1">
        {steps.map((step, i) => {
          const width = 80 - i * 10;
          return (
            <div
              key={step}
              className="flex items-center justify-center text-sm font-medium text-gray-800"
              style={{
                width: `${width}%`,
                background:
                  "linear-gradient(to top, #BFDBFE 0%, #DBEAFE 100%)", // gradient reversed
                padding: "12px 0",
                clipPath:
                  "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                border: "1px solid #fff",
                transform: "rotate(180deg)", // rotate each box
              }}
            >
              {/* Rotate text back upright */}
              <span style={{ transform: "rotate(180deg)" }}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
