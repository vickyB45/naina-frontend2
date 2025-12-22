import { handleAdminData } from "@/api/admin.api";
import { useQuery } from "@tanstack/react-query";

export const useAdmindata = () => {
  return useQuery({
    queryKey: ["admin:me"],
    queryFn: handleAdminData,
    retry: false,

    staleTime: 0,              // 🔥 NEVER Infinity for auth
    cacheTime: 5 * 60 * 1000,  // optional

    refetchOnMount: true,      // 🔥 REQUIRED
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};
