"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Ban,
  CheckCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useRouter } from "next/navigation";

const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/fa/0c/12/fa0c12e9aa0e5f6124e10c9dec188ded.jpg";

export default function ClientsDataTable() {
  const [clients, setClients] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

const [confirmOpen, setConfirmOpen] = useState(false);
const [selectedClientId, setSelectedClientId] = useState(null);
const [actionType, setActionType] = useState(null); // "block" | "unblock"
const [confirmLoading, setConfirmLoading] = useState(false);

const router = useRouter()


  const [filters, setFilters] = useState({
    search: "",
    isActive: "",
    onboarded: "",
    dateFilter: "",
    sort: "createdAt",
    order: "desc",
    page: 1,
    limit: 10,
  });

  // Fetch data from backend
  const fetchTenants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // Only add non-empty filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null) {
          params.set(key, value);
        }
      });

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/superadmin/all-tenants?${params.toString()}`,
        {
          withCredentials: true,
        }
      );

      setClients(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTenants();
  }, []);

  // Apply filters
  const applyFilters = () => {
    setFilters({ ...filters, page: 1 });
    fetchTenants();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      isActive: "",
      onboarded: "",
      dateFilter: "",
      sort: "createdAt",
      order: "desc",
      page: 1,
      limit: 10,
    });
    setTimeout(fetchTenants, 100);
  };

  // Change page
  const changePage = (newPage) => {
    setFilters({ ...filters, page: newPage });
    setTimeout(fetchTenants, 100);
  };

  // Toggle block status
  const handleBlockToggle = async (clientId, isBlocked) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/superadmin/tenant/${clientId}/block`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data?.message || "Tenant blocked");
      fetchTenants(); // Refresh data
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to block tenant"
      );
      console.error("Failed to toggle block:", error);
    }
  };
  const handleUnblockToggle = async (clientId) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/superadmin/tenant/${clientId}/unblock`,
        {}, // ✅ empty body
        { withCredentials: true } // ✅ config yahan
      );
      toast.success(res?.data?.message || "Tenant unblocked");

      fetchTenants(); // refresh
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to unblock tenant"
      );
      console.error("Failed to unblock tenant:", error);
    }
  };




  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Tenant Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {loading ? "Loading..." : `${clients.length} tenants found`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchTenants}
            disabled={loading}
            className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition font-medium"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Advanced Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition"
            >
              <X className="w-4 h-4" />
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="col-span-full">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email or business..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                value={filters.isActive}
                onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              >
                <option value="">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Onboarded */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Onboarding
              </label>
              <select
                value={filters.onboarded}
                onChange={(e) => setFilters({ ...filters, onboarded: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              >
                <option value="">All</option>
                <option value="true">Completed</option>
                <option value="false">Pending</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Date Range
              </label>
              <select
                value={filters.dateFilter}
                onChange={(e) => setFilters({ ...filters, dateFilter: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="lastMonth">Last Month</option>
                <option value="last6months">Last 6 Months</option>
              </select>
            </div>

            {/* Limit */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Per Page
              </label>
              <select
                value={filters.limit}
                onChange={(e) => setFilters({ ...filters, limit: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Applying..." : "Apply Filters"}
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Onboarding
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {clients.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            No tenants found
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    clients.map((client) => (
                      <tr
                        key={client._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition cursor-pointer"
                        onClick={()=>
                        router.replace(`/super-admin/clients/tenants/${client._id}`)
                        }>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={client.avatar || DEFAULT_AVATAR}
                              alt={client.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                            />
                            <div>
                              <div className="font-semibold text-black dark:text-white">
                                {client.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {client.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {client.businessName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {client.websiteUrl}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${client.isActive
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${client.isActive ? "bg-green-500" : "bg-red-500"
                                }`}
                            />
                            {client.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${client.onboarded
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                              }`}
                          >
                            {client.onboarded ? "Completed" : "Pending"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(client.createdAt)}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.replace(`/super-admin/clients/tenants/${client._id}`)
                              }}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </button>

                            <button
                              className={`p-2 rounded-lg transition ${client.isBlocked
                                ? "hover:bg-green-50 dark:hover:bg-green-900/20"
                                : "hover:bg-red-50 dark:hover:bg-red-900/20"
                                }`}
                              title={client.isBlocked ? "Unblock Tenant" : "Block Tenant"}
                              onClick={(e) => {
                                e.stopPropagation();

                                setSelectedClientId(client._id);
                                setActionType(client.isBlocked ? "unblock" : "block");
                                setConfirmOpen(true);
                              }}

                            >
                              {client.isBlocked ? (
                                <CheckCircle className=" cursor-pointer w-4 h-4 text-green-600 dark:text-green-400" />
                              ) : (
                                <Ban className="cursor-pointer w-4 h-4 text-red-600 dark:text-red-400" />
                              )}
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {clients.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Page <span className="font-semibold">{filters.page}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changePage(filters.page - 1)}
                    disabled={filters.page === 1}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => changePage(pageNum)}
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${filters.page === pageNum
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => changePage(filters.page + 1)}
                    disabled={filters.page === totalPages}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        <ConfirmDialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  loading={confirmLoading}
  title={actionType === "block" ? "Block Tenant" : "Unblock Tenant"}
  description={
    actionType === "block"
      ? "Are you sure you want to block this tenant? Access will be revoked immediately."
      : "Are you sure you want to unblock this tenant and restore access?"
  }
  confirmText={actionType === "block" ? "Yes, Block" : "Yes, Unblock"}
  variant={actionType === "block" ? "danger" : "success"}
  onConfirm={async () => {
    setConfirmLoading(true);

    try {
      if (actionType === "block") {
        await handleBlockToggle(selectedClientId);
      } else {
        await handleUnblockToggle(selectedClientId);
      }
    } finally {
      setConfirmLoading(false);
      setConfirmOpen(false);
      setSelectedClientId(null);
      setActionType(null);
    }
  }}
/>

      </div>
    </div>
  );
}