import axios from "axios"
import * as dotenv from "dotenv"
dotenv.config()

export const axiosEx = axios.create({
    baseURL: process.env.MESSAGE_HUB_URL as string,
    timeout: 10000,
})

/*
axiosEx.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // console.log(config)

        // showLoadingToast({
        //     message: "loading...",
        //     forbidClick: true,
        //     duration: 0,
        // })
        return {
            ...config,
            // waynerequest: "kerwin",
        }
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
axiosEx.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // closeToast()
        return {
            ...response,
            // wayneresponse: "bbb",
        }
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // closeToast()
        return Promise.reject(error)
    }
)
*/
