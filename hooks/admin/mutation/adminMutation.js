import {
  handleAdminLogout,
  handleAdminOnboarding,
  handleTenantLogin,
} from "@/api/admin.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTenantLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleTenantLogin,

    onSuccess: (data) => {
      toast.success(data?.message || "Login successful");

      // 🔥 force fresh admin fetch
     queryClient.invalidateQueries({ queryKey: ["admin:me"] });

    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};

export const useTenantLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAdminLogout,

    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["admin:me"] });
      toast.success(data?.message || "Logout successful");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Logout failed");
    },
  });
};

export const useAdminOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAdminOnboarding,

    onSuccess: (data) => {
      toast.success(data?.message || "Onboarding completed");

      queryClient.invalidateQueries({ queryKey: ["admin:me"] });

    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Onboarding failed");
    },
  });
};
