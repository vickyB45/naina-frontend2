"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Database,
  Building2,
  Users,
  CreditCard,
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  Bell,
  CalendarDays,
  Info,
  Download,
  Trash2,
  RefreshCw,
  Rocket,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BACKUP_TYPES = [
  { id: "full_database", title: "Complete Database", description: "Full database with all tables", size: 2500, critical: true, estimatedTime: 18, icon: Database },
  { id: "all_tenants", title: "All Tenants Data", description: "All organizations data", size: 1800, critical: true, estimatedTime: 12, icon: Building2 },
  { id: "users_data", title: "Users & Auth", description: "Users, roles, permissions", size: 350, critical: true, estimatedTime: 4, icon: Users },
  { id: "subscriptions", title: "Subscriptions", description: "Plans, billing, invoices", size: 180, critical: true, estimatedTime: 2, icon: CreditCard },
  { id: "transactions", title: "Transactions", description: "Payment records, refunds", size: 420, critical: true, estimatedTime: 5, icon: ShoppingCart },
  { id: "analytics", title: "Analytics", description: "Usage stats, metrics", size: 650, critical: false, estimatedTime: 7, icon: BarChart3 },
  { id: "configurations", title: "System Config", description: "Settings, feature flags", size: 25, critical: true, estimatedTime: 1, icon: Settings },
  { id: "documents", title: "Documents", description: "Uploaded files, attachments", size: 3200, critical: false, estimatedTime: 25, icon: FileText },
  { id: "notifications", title: "Notifications", description: "Email logs, templates", size: 120, critical: false, estimatedTime: 2, icon: Bell },
  { id: "audit_logs", title: "Audit Logs", description: "Activity, security events", size: 890, critical: true, estimatedTime: 7, icon: CalendarDays },
];

export default function SuperadminBackupPanel() {
  const [backups, setBackups] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const toggleType = (id) => {
    if (isBackingUp) return;
    setSelectedTypes((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
    
  };


  const selectAll = () => setSelectedTypes(BACKUP_TYPES.map((b) => b.id));
  const selectCritical = () =>
    setSelectedTypes(BACKUP_TYPES.filter((b) => b.critical).map((b) => b.id));
  const deselectAll = () => setSelectedTypes([]);

  const getTotalSize = () =>
    selectedTypes.reduce((total, id) => {
      const backup = BACKUP_TYPES.find((b) => b.id === id);
      return total + backup.size;
    }, 0);

  const formatSize = (mb) =>
    mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${mb} MB`;

  const handleBackup = () => {
    if (selectedTypes.length === 0) {
      toast.error("Please select at least one backup type");
      return;
    }

    setIsBackingUp(true);
    const backupId = `b${Date.now()}`;
    const selectedBackupTypes = BACKUP_TYPES.filter((b) =>
      selectedTypes.includes(b.id)
    );
    const totalTime = selectedBackupTypes.reduce(
      (sum, b) => sum + b.estimatedTime,
      0
    );
    const totalSize = getTotalSize();

    toast.info(`Backup started (${selectedTypes.length} types)`);

    const newBackup = {
      id: backupId,
      type:
        selectedTypes.length === BACKUP_TYPES.length
          ? "Full System Backup"
          : `Custom Backup (${selectedTypes.length} types)`,
      types: selectedBackupTypes.map((b) => b.title).join(", "),
      size: formatSize(totalSize),
      duration: `${Math.floor(totalTime / 60)}m ${totalTime % 60}s`,
      status: "in-progress",
      createdAt: new Date().toISOString(),
      progress: 0,
    };

    setBackups((prev) => [newBackup, ...prev]);

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setBackups((prev) =>
          prev.map((b) =>
            b.id === backupId ? { ...b, progress } : b
          )
        );
      }
    }, totalTime * 100);

    setTimeout(() => {
      clearInterval(progressInterval);
      setBackups((prev) =>
        prev.map((b) =>
          b.id === backupId
            ? { ...b, status: "completed", progress: 100 }
            : b
        )
      );
      setIsBackingUp(false);
      setSelectedTypes([]);
      toast.success(`Backup completed (${selectedTypes.length} types saved)`);
    }, totalTime * 1000);
  };

  const handleDownload = (b) =>
    toast.info(`Downloading ${b.type} (${b.size})`);
  const handleDelete = (b) => {
    setBackups((prev) => prev.filter((x) => x.id !== b.id));
    toast.warning(`${b.type} deleted`);
  };

  const totalSize = backups.reduce((acc, b) => {
    const sizeStr = b.size.replace(/[^\d.]/g, "");
    const sizeNum = parseFloat(sizeStr);
    const multiplier = b.size.includes("GB") ? 1024 : 1;
    return acc + (isNaN(sizeNum) ? 0 : sizeNum * multiplier);
  }, 0);

  const failedCount = backups.filter((b) => b.status === "failed").length;
  const completedCount = backups.filter((b) => b.status === "completed").length;

  return (
    <div className="min-h-screen p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-medium text-slate-900 dark:text-white">
            Superadmin Backup Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            SAAS Platform - Complete Data Backup Management
          </p>
        </div>

        {/* Backup Selector */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center flex-wrap gap-4">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Database className="w-4 h-4" /> Select Backup Types
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                Choose what data to backup
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <button onClick={selectAll} className="text-xs border rounded-md px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">All</button>
              <button onClick={selectCritical} className="text-xs border rounded-md px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">Critical</button>
              <button onClick={deselectAll} className="text-xs border rounded-md px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">Clear</button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {BACKUP_TYPES.map((backup) => {
                const Icon = backup.icon;
                const isSelected = selectedTypes.includes(backup.id);
                return (
                  <div
                    key={backup.id}
                    onClick={() => toggleType(backup.id)}
                    className={`relative p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                        : " hover:bg-slate-50 dark:hover:bg-zinc-900"
                    } ${isBackingUp ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {backup.critical && (
                      <span className="absolute top-2 right-8 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full font-medium">
                        Critical
                      </span>
                    )}

                    <div className="flex items-start gap-2 mb-2">
                      <Icon
                        className={`w-5 h-5 ${
                          isSelected ? "text-emerald-600" : "text-slate-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
                          {backup.title}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">
                          {backup.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? "bg-emerald-600 border-emerald-600"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{formatSize(backup.size)}</span>
                      <span>{backup.estimatedTime}min</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedTypes.length > 0 && (
              <div className="mt-4 pt-4 border-t dark:bg-slate-900">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-medium">{selectedTypes.length}</span>{" "}
                    selected •{" "}
                    <span className="ml-2 font-medium">
                      {formatSize(getTotalSize())}
                    </span>{" "}
                    total
                  </div>
                  <button
                    onClick={handleBackup}
                    disabled={isBackingUp}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-md font-medium transition flex items-center gap-2"
                  >
                    {isBackingUp ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4" /> Start Backup
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Backup History */}
        <Card className="shadow-lg mt-6">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" /> Backup History
            </CardTitle>
            <button
              onClick={() => {
                setBackups([]);
                toast.warning("All backups cleared");
              }}
              disabled={backups.length === 0}
              className="text-xs border px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-700 disabled:opacity-50 transition flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear All
            </button>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            {backups.length === 0 ? (
              <div className="text-center text-slate-500 py-6 text-sm">
                No backups created yet.
              </div>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Included Data</th>
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Duration</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {backups.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-zinc-900 transition"
                    >
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-100">
                        {b.type}
                      </td>
                      <td className="py-2 px-3 text-slate-500 dark:text-slate-400 truncate max-w-xs">
                        {b.types}
                      </td>
                      <td className="py-2 px-3 text-slate-700 dark:text-slate-300">
                        {b.size}
                      </td>
                      <td className="py-2 px-3 text-slate-500 dark:text-slate-400">
                        {b.duration}
                      </td>
                      <td className="py-2 px-3">
                        {b.status === "completed" ? (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle className="w-4 h-4" /> Done
                          </span>
                        ) : b.status === "in-progress" ? (
                          <span className="flex items-center gap-1 text-blue-500 dark:text-blue-400 font-medium">
                            <Loader2 className="w-4 h-4 animate-spin" /> Running
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-500 font-medium">
                            <XCircle className="w-4 h-4" /> Failed
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleDownload(b)}
                            className="text-xs border px-2 py-1 rounded-md flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                          >
                            <Download className="w-3 h-3" /> Download
                          </button>
                          <button
                            onClick={() => handleDelete(b)}
                            className="text-xs border px-2 py-1 rounded-md flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold mb-1">
                <BarChart3 className="w-4 h-4" /> Total Backups
              </div>
              <p className="text-2xl font-bold text-emerald-600">{backups.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold mb-1">
                <CheckCircle className="w-4 h-4" /> Completed
              </div>
              <p className="text-2xl font-bold text-blue-500">{completedCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold mb-1">
                <Database className="w-4 h-4" /> Total Size
              </div>
              <p className="text-2xl font-bold text-amber-500">
                {formatSize(totalSize)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Auto Backup Section */}
        <Card className="mt-6">
          <CardContent className="pt-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Automatic Backup
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Automatically back up critical system data every 12 hours.
              </p>
            </div>

            <button
              onClick={() => {
                setAutoBackup(!autoBackup);
                toast.info(
                  autoBackup
                    ? "Automatic backup disabled"
                    : "Automatic backup enabled"
                );
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition ${
                autoBackup
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100"
              }`}
            >
              {autoBackup ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Enabled
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" /> Disabled
                </>
              )}
            </button>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6 text-center text-slate-500 dark:text-slate-400 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Info className="w-4 h-4" />
            <span>
              All backups are encrypted and stored securely in the cloud.
            </span>
          </div>
          <p>
            Last Updated:{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {new Date().toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}