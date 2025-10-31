import { axiosBaseUrl } from "@/lib/axios";


export async function getMessages(message) {
    console.log(axiosBaseUrl)
    const res = await axiosBaseUrl.post("/api/chat-response",{message})
    return res.data;
}