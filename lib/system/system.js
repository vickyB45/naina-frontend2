import axios from "axios"

export async function getSystemOverview() {
    const res = await axios.get("")
    return res.data;
}
