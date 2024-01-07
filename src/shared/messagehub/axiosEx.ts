import axios from "axios"
import EnvJson from "../../../.env.json"

export const axiosEx = axios.create({
    baseURL: EnvJson.messageHubUrl,
    timeout: 10000,
})
