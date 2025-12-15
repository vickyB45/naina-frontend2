"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Database,
  FileText,
  Plus,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import {
  SUPERADMIN_ADD_CLIENT,
  SUPERADMIN_TRAFFIC_INSIGHTS,
} from "@/routes/superAdminRoutes";
import { getSystemOverview } from "@/lib/system/system";

export const SystemHealth = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemHealth = async () => {
      try {
        const res = await getSystemOverview();
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch system health", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSystemHealth();
  }, []);

  if (loading)
    return <p className="text-sm text-gray-500">Loading system data...</p>;

  if (!data)
    return <p className="text-sm text-red-500">Failed to load system data</p>;

  const { summary, _meta, logs } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          System Health & Logs
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Health Summary */}
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm">Server Uptime</span>
          <span className="text-sm font-semibold ml-auto">
            {summary.serverUptime}%
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-blue-500" />
          <span className="text-sm">API Latency (avg)</span>
          <span className="text-sm font-semibold ml-auto">
            {_meta.latencyMs} ms
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-gray-500" />
          <span className="text-sm">Active Agents</span>
          <span className="text-sm font-semibold ml-auto">
            {summary.activeAgents}
          </span>
        </div>

        <div className="flex items-center gap-3 pb-4 border-b">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="text-sm">System Errors</span>
          <span className="text-sm font-semibold ml-auto">
            {summary.errors}
          </span>
        </div>

        {/* Recent Logs */}
        <div>
          <p className="text-sm font-medium mb-2">Recent Logs:</p>

          {!logs || logs.length === 0 ? (
            <div className="text-xs text-muted-foreground py-2">
              No system logs found
            </div>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {logs.slice(0, 4).map((log, idx) => (
                <div
                  key={idx}
                  className={`text-xs p-2 rounded-md border ${
                    log.level === "error"
                      ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                      : log.level === "warning"
                      ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold capitalize">
                      {log.level}
                    </span>
                    <span className="text-gray-500">
                      {new Date(log.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {log.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => router.push(SUPERADMIN_ADD_CLIENT)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Client
          </Button>

          <Button
            onClick={() => router.push(SUPERADMIN_TRAFFIC_INSIGHTS)}
            variant="outline"
            className="flex-1"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Check AI Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
