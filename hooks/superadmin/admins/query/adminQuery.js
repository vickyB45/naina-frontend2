import {
  handleGetAllTenants,
  handleGetSingleTenantById,
} from "@/api/superadmin.api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetAllTenants = () => {
  return useInfiniteQuery({
    queryKey: ["superadmin:tenants"],

    queryFn: ({ pageParam = 1 }) =>
      handleGetAllTenants({
        page: pageParam,
        limit: 10,
      }),

    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage.page + 1 : undefined,

    staleTime: Infinity,
    cacheTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    retry: false,
  });
};

export const useShowSingleTenant = (tenantId) => {
  return useQuery({
    queryKey: ["superadmin:tenant", tenantId],

    queryFn: () => handleGetSingleTenantById(tenantId),

    retry: false,

    staleTime: Infinity,
    cacheTime: Infinity,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

