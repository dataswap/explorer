import axios from "axios"
// import * as dotenv from "dotenv"
// dotenv.config()

export const axiosEx = axios.create({
    // baseURL: process.env.MESSAGE_HUB_URL as string,
    baseURL: "http://localhost:3000",
    timeout: 10000,
})
