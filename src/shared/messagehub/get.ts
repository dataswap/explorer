import { axiosEx } from "./axiosEx"
import {
    Car,
    CarReplica,
    DatasetMetadata,
    DatasetProofMetadata,
    DatasetRequirement,
    DataswapMessage,
    MatchingBid,
    MatchingMetadata,
    MatchingTarget,
} from "@dataswapjs/dataswapjs"
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

export async function getDatasetRequirement(
    queryParam: QueryParam<DatasetRequirement>
): Promise<Result<ValueFields<DatasetRequirement>[]>> {
    return await getDswap<DatasetRequirement>(
        "/datasetrequirement/query",
        queryParam
    )
}

export async function getDatasetRequirementCount(
    queryParam: QueryParam<DatasetRequirement>
): Promise<Result<number>> {
    return await getDswap<DatasetRequirement>(
        "/datasetrequirement/total",
        queryParam
    )
}

export async function getDatasetProofMetadata(
    queryParam: QueryParam<DatasetProofMetadata>
): Promise<Result<ValueFields<DatasetProofMetadata>[]>> {
    return await getDswap<DatasetProofMetadata>(
        "/datasetproofmetadata/query",
        queryParam
    )
}

export async function getDatasetProofMetadataCount(
    queryParam: QueryParam<DatasetProofMetadata>
): Promise<Result<number>> {
    return await getDswap<DatasetProofMetadata>(
        "/datasetproofmetadata/total",
        queryParam
    )
}

export async function getCar(
    queryParam: QueryParam<Car>
): Promise<Result<ValueFields<Car>[]>> {
    return await getDswap<Car>("/car/query", queryParam)
}

export async function getCarCount(
    queryParam: QueryParam<Car>
): Promise<Result<number>> {
    return await getDswap<Car>("/car/total", queryParam)
}

export async function getCarReplica(
    queryParam: QueryParam<CarReplica>
): Promise<Result<ValueFields<CarReplica>[]>> {
    return await getDswap<CarReplica>("/carreplica/query", queryParam)
}

export async function getCarReplicaCount(
    queryParam: QueryParam<CarReplica>
): Promise<Result<number>> {
    return await getDswap<CarReplica>("/carreplica/total", queryParam)
}

export async function getMatchingMetadata(
    queryParam: QueryParam<MatchingMetadata>
): Promise<Result<ValueFields<MatchingMetadata>[]>> {
    return await getDswap<MatchingMetadata>(
        "/matchingmetadata/query",
        queryParam
    )
}

export async function getMatchingMetadataCount(
    queryParam: QueryParam<MatchingMetadata>
): Promise<Result<number>> {
    return await getDswap<MatchingMetadata>(
        "/matchingmetadata/total",
        queryParam
    )
}

export async function getMatchingTarget(
    queryParam: QueryParam<MatchingTarget>
): Promise<Result<ValueFields<MatchingTarget>[]>> {
    return await getDswap<MatchingTarget>("/matchingtarget/query", queryParam)
}

export async function getMatchingTargetCount(
    queryParam: QueryParam<MatchingTarget>
): Promise<Result<number>> {
    return await getDswap<MatchingTarget>("/matchingtarget/total", queryParam)
}

export async function getMatchingBids(
    queryParam: QueryParam<MatchingBid>
): Promise<Result<ValueFields<MatchingBid>[]>> {
    return await getDswap<MatchingBid>("/matchingbids/query", queryParam)
}

export async function getMatchingBidsCount(
    queryParam: QueryParam<MatchingBid>
): Promise<Result<number>> {
    return await getDswap<MatchingBid>("/matchingbids/total", queryParam)
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
