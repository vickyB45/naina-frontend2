'use client'

import { getTrendsAnalytics } from "@/lib/analytics/analytics";
import { getOverview, getTrends } from "@/lib/overview/overview";
import { useQuery } from "@tanstack/react-query";

export const useSuperadminOverview = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: () => getOverview(),
    staleTime: 1000 * 60 * 2, // 2 min
    refetchOnWindowFocus: false,
  });
};


export const useTrendsData = () => {
  return useQuery({
    queryKey: ["trends"],
    queryFn: () => getTrends(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};


export const useTrendsAnalytics = () => {
  return useQuery({
    queryKey: ["trends-analytics"],
    queryFn: () => getTrendsAnalytics(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

