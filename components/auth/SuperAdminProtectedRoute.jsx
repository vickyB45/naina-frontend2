"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useMe } from "@/hooks/superadmin/auth/superadmin.manageserver";
import { toast } from "sonner";

/* ======================
   Loading Screen
====================== */
function AuthScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black mb-4">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-black" />
        <p className="text-gray-600 text-sm">
          Verifying superadmin access…
        </p>
      </div>
    </div>
  );
}

export default function SuperAdminProtectedRoute({ children }) {
  const router = useRouter();
  const toastShown = useRef(false);

  const { data, isLoading, isError } = useMe();

  const isAuthenticated = data?.success === true;
  const user = data?.data;

  // 🔥 normalize role (IMPORTANT FIX)
  const role = user?.role?.toLowerCase();

  useEffect(() => {
    if (isLoading) return;

    /* ❌ Not logged in OR API error */
    if (!isAuthenticated || isError) {
      if (!toastShown.current) {
        toast.error("Please login as superadmin");
        toastShown.current = true;
      }
      router.replace("/auth/login");
      return;
    }

    /* ❌ Wrong role */
    if (role !== "superadmin") {
      if (!toastShown.current) {
        toast.error("Superadmin access only");
        toastShown.current = true;
      }
      router.replace("/auth/login");
      return;
    }

    /* ✅ Access granted → reset toast lock */
    toastShown.current = false;
  }, [isLoading, isAuthenticated, isError, role, router]);

  /* ======================
     Render Guards
  ====================== */

  if (isLoading) return <AuthScreen />;

  if (!isAuthenticated || role !== "superadmin") {
    return <AuthScreen />;
  }

  return <>{children}</>;
}
