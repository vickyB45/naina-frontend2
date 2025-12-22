"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
  UserCircle,
  Loader2,
} from "lucide-react";

import { useAdminsLogin } from "@/hooks/superadmin/auth/superadmin.manageserver";
import { useTenantLogin } from "@/hooks/admin/mutation/adminMutation";

const LoginAdmins = () => {
  const router = useRouter();

  /* -----------------------------
     Prefetch
  ----------------------------- */
  useEffect(() => {
    router.prefetch("/super-admin");
    router.prefetch("/admin");
  }, [router]);

  /* -----------------------------
     Local State
  ----------------------------- */
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);

  /* -----------------------------
     Mutations
  ----------------------------- */
  const superadminLogin = useAdminsLogin();
  const adminLogin = useTenantLogin();

  /* -----------------------------
     Formik
  ----------------------------- */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      const payload = {
        email: values.email,
        password: values.password,
        role,
      };

      if (role === "admin") {
        adminLogin.mutate(payload, {
          onSuccess: () => {
            router.replace("/admin");
          },

          onSettled: () => {
            adminLogin.reset(); // 🔥 loader stop guaranteed
          },
        });
      } else {
        superadminLogin.mutate(payload, {
          onSuccess: () => {
            router.replace("/super-admin");
          },

          onSettled: () => {
            superadminLogin.reset(); // 🔥 loader stop guaranteed
          },
        });
      }
    },
  });

  /* -----------------------------
     Loader (safe)
  ----------------------------- */
  const isPending =
    superadminLogin.isPending || adminLogin.isPending;

  /* -----------------------------
     UI
  ----------------------------- */
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">

        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-4">
            <ShieldCheck className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-bold">Naina Portal</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Secure Management System Access
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8">

          {/* Role Switcher */}
          <div className="flex p-1 bg-black rounded-xl mb-8 border border-gray-800">
            <button
              type="button"
              onClick={() => setRole("admin")}
              disabled={isPending}
              className={`flex-1 py-2.5 rounded-lg text-sm transition ${role === "admin"
                  ? "bg-white text-black"
                  : "text-gray-500 hover:text-white"
                }`}
            >
              <UserCircle size={16} className="inline mr-2" />
              Admin
            </button>

            <button
              type="button"
              onClick={() => setRole("superadmin")}
              disabled={isPending}
              className={`flex-1 py-2.5 rounded-lg text-sm transition ${role === "superadmin"
                  ? "bg-white text-black"
                  : "text-gray-500 hover:text-white"
                }`}
            >
              <ShieldCheck size={16} className="inline mr-2" />
              Superadmin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 uppercase">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your email"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 pl-11 pr-4 focus:border-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="*********"
                  required
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 pl-11 pr-12 focus:border-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-white text-black rounded-xl py-4 font-bold flex justify-center gap-2 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmins;
