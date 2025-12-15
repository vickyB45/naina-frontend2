import { axiosBaseUrl } from "../axios";


export async function getTrendsAnalytics() {
    const res = await axiosBaseUrl.get("https://naina-fullstack-backend-new.onrender.com/api/analytics/overview?tenantId=crookstore")
    return res.data;
}



