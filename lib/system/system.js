import { axiosBaseUrl } from "../axios";



export async function getSystemOverview() {
    const res = await axiosBaseUrl.get("https://naina-fullstack-backend-new.onrender.com/api/system/overview")
    // const res = await axiosBaseUrl.get("http://localhost:5174/api/system/overview")
    console.log(res)
    return res.data;
}
