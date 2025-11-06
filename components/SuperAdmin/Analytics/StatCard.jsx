

import { ResponsiveContainer, Area, AreaChart } from "recharts";

const StatCard = ({ title, value, change, data, color }) => {
  return (
    <div className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col ">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {change}
        </span>
      </div>

      {/* Value + Chart */}
      <div className="flex justify-between items-center gap-2">
        <div className="mt-3 mb-2 text-2xl font-semibold tracking-tight ">
          {value}
        </div>

        {/* Gradient Chart */}
       {data && (
         <div className="h-10 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#gradient-${color})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
       )}
      </div>
    </div>
  );
};

export default StatCard