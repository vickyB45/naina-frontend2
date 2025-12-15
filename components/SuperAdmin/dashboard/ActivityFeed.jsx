'use client'

import { useMemo } from "react";
import {
  CheckCircle,
  FileText,
  MessageSquare,
  Users,
  Zap,
  AlertTriangle,
  Database,
  Bot,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { recentActivityFeed } from "@/utils/api/dashboard/recentActivityFeed";

// ✅ Activity Feed Component
export const ActivityFeed = () => {
  // 🔹 Helper: format date
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });
  };

  // 🔹 Helper: return icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "client_added":
      case "plan_upgrade":
        return <Users className="w-4 h-4 text-green-500" />;
      case "api_alert":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "data_backup":
        return <Database className="w-4 h-4 text-blue-500" />;
      case "support_ticket":
        return <MessageSquare className="w-4 h-4 text-purple-500" />;
      case "ai_model_update":
        return <Bot className="w-4 h-4 text-cyan-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const sortedActivities = useMemo(() => {
    return [...recentActivityFeed].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  }, [recentActivityFeed]);

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Activity Feed
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {sortedActivities.map((activity, index) => (
          <div
            key={activity.id || index}
            className="flex items-start gap-3 pb-3 border-b last:border-0"
          >
            {/* Icon */}
            <div className="mt-1 p-2 rounded-full bg-gray-100 dark:bg-gray-800">
              {getIcon(activity.type)}
            </div>

            {/* Main Info */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {activity.message}
              </p>

              {/* Extra Details (if any) */}
              {activity.details && (
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {Object.entries(activity.details)
                    .slice(0, 2)
                    .map(([key, value], i) => (
                      <span key={i} className="block capitalize">
                        {key.replace(/([A-Z])/g, " $1")}: {String(value)}
                      </span>
                    ))}
                </div>
              )}

              {/* Triggered by */}
              <p className="mt-1 text-xs text-gray-400">
                Triggered by: {activity.user}
              </p>
            </div>

            {/* Time */}
            <span className="text-xs text-gray-500">
              {formatTime(activity.timestamp)}
            </span>
          </div>
        ))}

        {/* Action Buttons */}
      </CardContent>
        <div className="flex gap-2 pt-2 px-3">
          <Button variant="outline" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            View All Logs
          </Button>
          <Button variant="outline" className="flex-1">
            <Zap className="w-4 h-4 mr-2" />
            System Insights
          </Button>
        </div>
    </Card>
  );
};
