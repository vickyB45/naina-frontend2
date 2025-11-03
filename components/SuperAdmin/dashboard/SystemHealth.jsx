
'use client'
import { AlertTriangle, BarChart3, CheckCircle, Database, FileText, Plus, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { SUPERADMIN_ADD_CLIENT, SUPERADMIN_TRAFFIC_INSIGHTS } from "@/routes/superAdminRoutes";


// System Health Component
export const SystemHealth = ({ healthData }) => {

  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">System Health & Logs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm">Server Uptime</span>
          <span className="text-sm font-semibold ml-auto">{healthData.uptime}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-blue-500" />
          <span className="text-sm">API Latency</span>
          <span className="text-sm font-semibold ml-auto">{healthData.latency}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-gray-500" />
          <span className="text-sm">DB Connections</span>
          <span className="text-sm font-semibold ml-auto">{healthData.dbConnections}</span>
        </div>
        
        <div className="flex items-center gap-3 pb-4 border-b">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="text-sm">System Warnings</span>
          <Button variant="ghost" size="sm" className="ml-auto text-xs">
            <FileText className="w-3 h-3 mr-1" />
            View System Logs
          </Button>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
          onClick={()=>router.push(SUPERADMIN_ADD_CLIENT)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add New Client
          </Button>
          <Button
            onClick={()=>router.push(SUPERADMIN_TRAFFIC_INSIGHTS)}
          variant="outline" className="flex-1">
          
            <BarChart3 className="w-4 h-4 mr-2" />
            Check AI Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
