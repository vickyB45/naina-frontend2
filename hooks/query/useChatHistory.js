'use client'
import { fetchChatHistory } from "@/services/chat.api";
import { useQuery } from "@tanstack/react-query";

export const useChatHistory = (sessionId) => {
  return useQuery({
    queryKey: ["chatHistory", sessionId],
    queryFn: () => fetchChatHistory(sessionId),
    enabled: !!sessionId,   // query tabhi chalega jab sessionId ho
    staleTime: 1000 * 60 * 2, // 2 min
    refetchOnWindowFocus: false,
  });
};
