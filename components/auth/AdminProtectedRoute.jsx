"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useAdmindata } from "@/hooks/admin/query/adminQuery";
import { toast } from "sonner";

/* ======================
   Loading Screen
====================== */
function AuthScreen() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black mb-4">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-black" />
        <p className="text-gray-600 text-sm">Verifying access...</p>
      </div>
    </div>
  );
}

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const toastShown = useRef(false);

  const { data, isLoading } = useAdmindata();

  const isAuthenticated = data?.success === true;
  const admin = data?.data;

  useEffect(() => {
    if (isLoading) return;

    /* ❌ Not logged in */
    if (!isAuthenticated) {
      if (!toastShown.current) {
        toast.error("Please login to access the admin panel");
        toastShown.current = true;
      }
      router.replace("/auth/login");
      return;
    }

    /* ❌ Wrong role */
    if (admin?.role !== "admin") {
      if (!toastShown.current) {
        toast.error("Access denied. Admin role required.");
        toastShown.current = true;
      }
      router.replace("/auth/login");
      return;
    }

    /* 🚧 Not onboarded → trying admin panel */
   /* 🚫 Onboarded → trying onboarding again */
if (admin?.onboarded === true && pathname === "/admin/onboarding") {
  if (!toastShown.current) {
    toast.error("You have already completed onboarding.");
    toastShown.current = true;
  }
  router.replace("/admin");
  return;
}

/* 🚧 Not onboarded → trying admin panel */
if (admin?.onboarded === false && pathname !== "/admin/onboarding") {
  if (!toastShown.current) {
    toast.error("Complete onboarding before accessing the admin panel.");
    toastShown.current = true;
  }
  router.replace("/admin/onboarding");
  return;
}

    // ✅ Access allowed → reset toast lock
    toastShown.current = false;
  }, [isLoading, isAuthenticated, admin, pathname, router]);

  /* ======================
     Render Guards
  ====================== */

  if (isLoading) return <AuthScreen />;

  if (!isAuthenticated) return <AuthScreen />;

  if (admin?.role !== "admin") return <AuthScreen />;

  if (admin?.onboarded === false && pathname !== "/admin/onboarding") {
    return <AuthScreen />;
  }

  return <>{children}</>;
}


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAdmindata } from "@/hooks/admin/query/adminQuery";
// import { toast } from "sonner";

// export default function AdminProtectedRoute({ children }) {
//   const router = useRouter();
//   const { data, isLoading } = useAdmindata();

//   const isAuthenticated = data?.success === true;
//   const admin = data?.data;

//   useEffect(() => {
//     if (isLoading) return;

//     if (!isAuthenticated) {
//       toast.error("Please login as admin");
//       router.replace("/auth/login");
//       return;
//     }

//     if (admin?.role !== "admin") {
//       toast.error("Admin access only");
//       router.replace("/auth/login");
//       return;
//     }
//   }, [isLoading, isAuthenticated, admin, router]);

//   if (isLoading) return null;
//   if (!isAuthenticated) return null;

//   return <>{children}</>;
// }
