import axios from "axios";

export const fetchChatHistory = async (sessionId) => {
  const res = await axios.get(
    `http://localhost:5173/api/chat/history/${sessionId}`
  );
  return res.data;  // <-- correct
};
