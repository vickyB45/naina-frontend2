import axios from "axios";


export const axiosBaseUrl = axios.create({
    baseURL:process.env.NEXT_API_BASE_URL
})