import { axiosEx } from "./axiosEx"
import { DatasetMetadata, DataswapMessage } from "@dataswapjs/dataswapjs"
import { QueryParam } from "./queryParams"
import { ValueFields, Result } from "@unipackage/utils"

export async function getVersion(): Promise<string> {
    try {
        const res = await axiosEx.get(`/version`)
        return res.data
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

async function getDswap<T>(
    path: string,
    queryParam: QueryParam<T>
): Promise<Result<any>> {
    try {
        const res = await axiosEx.post(path, queryParam)
        return res.data
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function getDataswapMessage(
    queryParam: QueryParam<DataswapMessage>
): Promise<Result<ValueFields<DataswapMessage>[]>> {
    return await getDswap<DataswapMessage>("/dataswapmessage/query", queryParam)
}

export async function getDataswapMessageCount(
    queryParam: QueryParam<DataswapMessage>
): Promise<Result<number>> {
    return await getDswap<DataswapMessage>("/dataswapmessage/total", queryParam)
}

export async function getDatasetMetadata(
    queryParam: QueryParam<DatasetMetadata>
): Promise<Result<ValueFields<DatasetMetadata>[]>> {
    return await getDswap<DatasetMetadata>("/datasetMetadata/query", queryParam)
}

export async function getDatasetMetadataCount(
    queryParam: QueryParam<DatasetMetadata>
): Promise<Result<number>> {
    return await getDswap<DatasetMetadata>("/datasetMetadata/total", queryParam)
}

export interface SyncStatus {
    startSyncHeight: number
    currentSyncHeight: number
    isRunning: boolean
}

export async function getSyncStatus(
    queryParam: QueryParam<void>
): Promise<Result<SyncStatus>> {
    return await getDswap<void>("/syncstatus/query", queryParam)
}
