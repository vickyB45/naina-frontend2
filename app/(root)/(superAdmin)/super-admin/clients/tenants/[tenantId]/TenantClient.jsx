"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  Copy,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Shield,
  Calendar,
  DollarSign,
  Globe,
} from "lucide-react";

import { useShowSingleTenant } from "@/hooks/superadmin/admins/query/adminQuery";
import ConfirmActionModal from "@/components/ConfirmDialog";

export default function TenantClient({ tenantId }) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useShowSingleTenant(tenantId);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState />;

  const tenant = data?.data;
  const isBlocked = tenant?.isBlocked;

  const handleCopyTenantData = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(tenant, null, 2)
      );
      toast.success("Tenant data copied to clipboard");
    } catch {
      toast.error("Failed to copy tenant data");
    }
  };

  const handleConfirmAction = async () => {
    try {
      setActionLoading(true);

      const endpoint =
        actionType === "block"
          ? `/api/superadmin/tenant/${tenantId}/block`
          : `/api/superadmin/tenant/${tenantId}/unblock`;

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${endpoint}`,
        {},
        { withCredentials: true }
      );

      toast.success(res.data?.message || "Action successful");
      queryClient.invalidateQueries(["tenant", tenantId]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(false);
      setConfirmOpen(false);
      setActionType(null);
    }
  };

  return (
    <>
      <ConfirmActionModal
        open={confirmOpen}
        loading={actionLoading}
        title={actionType === "block" ? "Block Tenant" : "Unblock Tenant"}
        description={
          actionType === "block"
            ? "Are you sure you want to block this tenant? Access will be revoked immediately."
            : "Are you sure you want to unblock this tenant and restore access?"
        }
        confirmText={actionType === "block" ? "Block" : "Unblock"}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmAction}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* HEADER - Compact */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-14 h-14 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
                <img
                  src={tenant?.avatar || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-lg object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-bold truncate pr-2">
                  {tenant?.businessName || tenant?.name}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tenant?.name}
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyTenantData}
              className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-all"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* STATUS CARDS - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatusCard
              icon={<Shield className="w-5 h-5 text-white" />}
              title="Status"
              value={tenant?.isActive ? "Active" : "Inactive"}
              color={
                tenant?.isActive
                  ? "from-emerald-500 to-emerald-600"
                  : "from-red-500 to-red-600"
              }
              isBlocked={tenant?.isBlocked}
            />
            <StatusCard
              icon={<DollarSign className="w-5 h-5 text-white" />}
              title="Subscription"
              value={tenant?.subscription?.status || "Inactive"}
              color="from-amber-500 to-amber-600"
            />
            <StatusCard
              icon={<CheckCircle className="w-5 h-5 text-white" />}
              title="Onboarded"
              value={tenant?.onboarded ? "Yes" : "No"}
              color={
                tenant?.onboarded
                  ? "from-emerald-500 to-emerald-600"
                  : "from-gray-500 to-gray-600"
              }
            />
            <StatusCard
              icon={<Globe className="w-5 h-5 text-white" />}
              title="Terms"
              value={tenant?.terms?.accepted ? "Accepted" : "Pending"}
              color={
                tenant?.terms?.accepted
                  ? "from-emerald-500 to-emerald-600"
                  : "from-orange-500 to-orange-600"
              }
            />
          </div>

          {/* MAIN GRID - Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* LEFT */}
            <div className="space-y-4">
              <GlassCard title="Contact Info" icon={<Mail className="w-4 h-4" />}>
                <InfoRow icon={<Mail className="w-4 h-4 text-gray-500" />} label="Email" value={tenant?.email} />
                <InfoRow icon={<Globe className="w-4 h-4 text-gray-500" />} label="Website" value={tenant?.websiteUrl} />
                <InfoRow icon={<Calendar className="w-4 h-4 text-gray-500" />} label="Created" value={formatDate(tenant?.createdAt)} />
                <InfoRow icon={<Calendar className="w-4 h-4 text-gray-500" />} label="Updated" value={formatDate(tenant?.updatedAt)} />
                <InfoRow icon={<Calendar className="w-4 h-4 text-gray-500" />} label="Password Changed" value={formatDate(tenant?.lastPasswordChangedAt)} />
              </GlassCard>

              <GlassCard title="Notifications" icon={<Phone className="w-4 h-4" />}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <NotificationToggle active={tenant?.notifications?.email} label="Email" />
                  <NotificationToggle active={tenant?.notifications?.sms} label="SMS" />
                  <NotificationToggle active={tenant?.notifications?.whatsapp} label="WhatsApp" />
                </div>
              </GlassCard>

              <GlassCard title="Tenant Info" icon={<Globe className="w-4 h-4" />}>
                <InfoRow label="ID" value={tenant?._id} />
                <InfoRow label="Role" value={tenant?.role} />
              </GlassCard>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <GlassCard title="Subscription" icon={<DollarSign className="w-4 h-4" />}>
                <InfoRow label="Plan" value={tenant?.subscription?.planName || "No Plan"} />
                <InfoRow label="Status" value={tenant?.subscription?.status} />
                <InfoRow label="Currency" value={tenant?.subscription?.currency} />
                <InfoRow label="Billing Cycle" value={tenant?.subscription?.billingCycle || "N/A"} />
                <InfoRow label="Price" value={tenant?.subscription?.price ? `₹${tenant.subscription.price}` : "N/A"} />
                <InfoRow label="Trial" value={tenant?.subscription?.isTrial ? "Yes" : "No"} />
              </GlassCard>

              <GlassCard title="Security" icon={<Shield className="w-4 h-4" />}>
                <InfoRow label="2FA" value={tenant?.twoFactorEnabled ? "Enabled" : "Disabled"} />
                <InfoRow label="Terms" value={tenant?.terms?.accepted ? `v${tenant.terms.version}` : `Pending (v${tenant?.terms?.version || '1'})`} />
                <InfoRow label="API Keys" value={tenant?.apiKeys?.length || 0} />
                <InfoRow label="Trusted Devices" value={tenant?.trustedDevices?.length || 0} />
                <InfoRow label="Audit Logs" value={tenant?.auditLogs?.length || 0} />
              </GlassCard>

              <GlassCard title="Recent Logins" icon={<Calendar className="w-4 h-4" />}>
                {tenant?.loginHistory?.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {tenant.loginHistory.slice(0, 3).map((log, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100/50 dark:border-gray-700/50"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-xs truncate">{log?.ip || "Unknown IP"}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{log?.device || "Unknown"}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {log?.createdAt ? new Date(log.createdAt).toLocaleString("en-IN", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }) : "Unknown"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Shield className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">No login history</p>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>

          {/* ACTIONS - Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={() => {
                setActionType(isBlocked ? "unblock" : "block");
                setConfirmOpen(true);
              }}
              disabled={actionLoading}
              className={`group flex-1 font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
                isBlocked
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-400/20"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-400/20"
              } ${actionLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {actionLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                isBlocked ? "Unblock" : "Block"
              )}
            </button>

            <button 
              className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-sm"
              onClick={() => toast.info("Analytics coming soon!")}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= COMPACT COMPONENTS ================= */

function StatusCard({ icon, title, value, color, isBlocked }) {
  return (
    <div className="group bg-white/90 dark:bg-gray-900/70 backdrop-blur-md border border-gray-100/50 dark:border-gray-800/50 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform bg-gradient-to-r ${color}`}>
          {icon}
        </div>
        {isBlocked && (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-500 border border-red-500/30">
            BLOCKED
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
        {title}
      </p>
      <p className="text-lg font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function GlassCard({ title, icon, children }) {
  return (
    <div className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-md border border-gray-100/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
      <h2 className="text-lg font-bold mb-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-200/50 dark:border-gray-700/50">
          {icon}
        </div>
        <span>{title}</span>
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="group flex items-center gap-3 p-3.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100/50 dark:border-gray-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150">
      {icon && (
        <div className="p-2 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-100/50 dark:border-gray-800/50 flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

function NotificationToggle({ active, label }) {
  return (
    <div className="group p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100/50 dark:border-gray-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">{label}</span>
        <div className={`w-6 h-6 rounded-xl shadow-md flex items-center justify-center transition-all duration-200 group-hover:scale-105 ${active ? "bg-emerald-500 shadow-emerald-400/30" : "bg-gray-200 dark:bg-gray-700 shadow-gray-300/30 dark:shadow-gray-600/30"}`}>
          {active ? <CheckCircle className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-white/60 dark:bg-gray-500 rounded-full" />}
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  return dateString ? new Date(dateString).toLocaleDateString("en-IN") : "N/A";
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="space-y-2 flex-1">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="h-4 w-32 bg-gray-100/50 dark:bg-gray-700/50 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900 flex items-center justify-center p-6">
      <div className="text-center max-w-sm mx-auto space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 flex items-center justify-center shadow-lg">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Failed to load</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Unable to fetch tenant data</p>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
          Retry
        </button>
      </div>
    </div>
  );
}
