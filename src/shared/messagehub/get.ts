// import { axiosEx } from "./axiosEx"
import axios from "axios"
import { DatasetMetadata, DataswapMessage } from "@dataswapjs/dataswapjs"
import { QueryParam } from "./queryParams"
import { ValueFields, Result } from "@unipackage/utils"

async function getDswap<T>(
    path: string,
    queryParam: QueryParam<T>
): Promise<Result<any>> {
    try {
        const res = await axios.post(path, queryParam)
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getDataswapMessage(
    queryParam: QueryParam<DataswapMessage>
): Promise<Result<ValueFields<DataswapMessage>[]>> {
    return await getDswap<DataswapMessage>(
        "http://localhost:3000/dataswapmessage/query",
        queryParam
    )
}

export async function getDatasetMetadata(
    queryParam: QueryParam<DatasetMetadata>
): Promise<Result<ValueFields<DatasetMetadata>[]>> {
    return await getDswap<DatasetMetadata>(
        "http://localhost:3000/datasetMetadata/query",
        queryParam
    )
}

export interface SyncStatus {
    startSyncHeight: number
    currentSyncHeight: number
    isRunning: boolean
}

export async function getSyncStatus(
    queryParam: QueryParam<void>
): Promise<Result<SyncStatus>> {
    return await getDswap<void>(
        "http://localhost:3000/syncstatus/query",
        queryParam
    )
}

export async function getVersion(): Promise<string> {
    try {
        const res = await axios.get(`http://localhost:3000/version`)
        return res.data
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Error status:", error.response.status)
            console.error("Error data:", error.response.data)
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request)
        } else {
            // Something happened in setting up the request that triggered an error
            console.error("Error message:", error.message)
        }
        throw new Error("Failed to fetch version data")
    }
}
