import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleCreateTenants, handleGetMe, handleSuperadminLogin, handleSuperadminLogout } from "@/api/superadmin.api";

export const useAdminsLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleSuperadminLogin,

    onSuccess: (data) => {
      toast.success(data?.message || "Login successful");

      // 🔥 VERY IMPORTANT
        queryClient.removeQueries({ queryKey: ["superadmin:me"] });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};



export const useAdminsLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleSuperadminLogout,

    onSuccess: (data) => {
      // 🔥 sirf superadmin ka cache clear
      queryClient.removeQueries({ queryKey: ["superadmin:me"] });

      toast.success(data?.message || "Logged out successfully");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Logout failed");
    },
  });
};


export const useMe = () => {
  return useQuery({
    queryKey: ["superadmin:me"],
    queryFn: handleGetMe,

    retry: false,
    staleTime: 1000 * 60 * 5,   // 5 minutes
    cacheTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
};




