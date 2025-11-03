import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

// Stats Card Component
export const StatsCard = ({ title, value, change, changeLabel, icon: Icon, bgColor }) => {
  const isPositive = change?.startsWith("+");
  const isNegative = change?.startsWith("-");
  
  return (
    <Card className={`${bgColor} border-none`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          {Icon && <Icon className="w-5 h-5 text-gray-400" />}
        </div>
        <div className="text-3xl font-bold mb-2 text-black">{value}</div>
        <div className="flex items-center gap-2 text-xs">
          <span className={`flex items-center gap-1 font-medium ${
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change}
            {isPositive && <TrendingUp className="w-3 h-3" />}
            {isNegative && <TrendingDown className="w-3 h-3" />}
          </span>
          <span className="text-gray-500">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};