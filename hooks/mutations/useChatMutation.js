// src/hooks/useChatMutation.js
import { useMutation } from "@tanstack/react-query";
import { getMessages } from "@/services/chat.api";

export const useChatMutation = () => {
  return useMutation({
    mutationFn: getMessages,
    onError: (err) => console.error("Chat API Error:", err),
  });
};
