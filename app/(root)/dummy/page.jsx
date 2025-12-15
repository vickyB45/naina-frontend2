"use client";

import { useChatHistory } from "@/hooks/query/useChatHistory";
import ChatViewer from "@/components/ChatViewer";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const id = "session_b6ac8fab-cc11-498f-9823-5cd67ad53b18";
    setSessionId(id);
  }, []);

  const { data, isLoading } = useChatHistory(sessionId);

  if (!sessionId) return <p>Loading session...</p>;
  if (isLoading) return <p>Loading chat...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>

      <ChatViewer messages={data?.messages || []} />
    </div>
  );
}
