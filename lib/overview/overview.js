import { axiosBaseUrl } from "../axios";


export async function getOverview() {
    const res = await axiosBaseUrl.get("https://naina-fullstack-backend-new.onrender.com/api/analytics/overview")
    // const res = await axiosBaseUrl.get("http://localhost:5174/api/analytics/overview")
    return res.data;
}


export async function getTrends() {
    const res = await axiosBaseUrl.get(
        "https://naina-fullstack-backend-new.onrender.com/api/analytics/trends"
        // "http://localhost:5174/api/analytics/trends"
    );
    return res.data;
}