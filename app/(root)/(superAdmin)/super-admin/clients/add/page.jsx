"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Save,
  UserPlus,
  Building2,
  Mail,
  Lock,
  Globe,
  User,
  Sparkles,
} from "lucide-react";
import { useCreateTenant } from "@/hooks/superadmin/admins/mutation/superadminAdminMutation";

export default function AddTenant() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      password: "",
      websiteUrl: "",
    },
  });

  const { mutate: createTenant, isPending } = useCreateTenant();

  const onSubmit = (data) => {
    createTenant(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div
      className="
        min-h-screen py-12 px-4
        bg-gradient-to-br
        from-gray-50 via-white to-gray-100
        dark:from-black dark:via-gray-950 dark:to-black
      "
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-white dark:to-gray-300 mb-4 shadow-2xl">
            <UserPlus className="w-10 h-10 text-black" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            Create New Tenant
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Set up a new organization in seconds
          </p>
        </div>

        {/* Card */}
        <Card
          className="
            border border-gray-200 dark:border-gray-800
            bg-white/80 dark:bg-black/40
            backdrop-blur-xl shadow-2xl
          "
        >
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Business */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tenant Name */}
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Tenant Name
                  </Label>
                  <Input
                    placeholder="John Doe"
                    className="
                      bg-white dark:bg-white/5
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-white
                      placeholder:text-gray-400 dark:placeholder:text-gray-500
                      h-12 rounded-xl
                      focus:border-black dark:focus:border-white
                      focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20
                    "
                    {...register("name", {
                      required: "Tenant name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" />
                    Business Name
                  </Label>
                  <Input
                    placeholder="ABC Pvt Ltd"
                    className="
                      bg-white dark:bg-white/5
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-white
                      placeholder:text-gray-400 dark:placeholder:text-gray-500
                      h-12 rounded-xl
                      focus:border-black dark:focus:border-white
                      focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20
                    "
                    {...register("businessName", {
                      required: "Business name is required",
                    })}
                  />
                  {errors.businessName && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">
                      {errors.businessName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-black px-4 text-xs text-gray-500 uppercase tracking-widest">
                    Credentials
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="admin@company.com"
                  className="
                    bg-white dark:bg-white/5
                    border border-gray-300 dark:border-gray-700
                    text-gray-900 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    h-12 rounded-xl
                    focus:border-black dark:focus:border-white
                    focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20
                  "
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password & Website */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="
                      bg-white dark:bg-white/5
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-white
                      placeholder:text-gray-400 dark:placeholder:text-gray-500
                      h-12 rounded-xl
                      focus:border-black dark:focus:border-white
                      focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20
                    "
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    Website URL
                  </Label>
                  <Input
                    placeholder="https://company.com"
                    className="
                      bg-white dark:bg-white/5
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-white
                      placeholder:text-gray-400 dark:placeholder:text-gray-500
                      h-12 rounded-xl
                      focus:border-black dark:focus:border-white
                      focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20
                    "
                    {...register("websiteUrl", {
                      required: "Website URL is required",
                    })}
                  />
                  {errors.websiteUrl && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">
                      {errors.websiteUrl.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="
                  w-full h-14 rounded-xl font-bold text-sm uppercase tracking-widest
                  bg-black text-white hover:bg-gray-900
                  dark:bg-white dark:text-black dark:hover:bg-gray-200
                  transition-all shadow-lg
                "
              >
                {isPending ? "Creating Tenant..." : "Create Tenant"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-xs text-center text-gray-600 dark:text-gray-500">
          New tenant will receive login credentials via email
        </p>
      </div>
    </div>
  );
}
