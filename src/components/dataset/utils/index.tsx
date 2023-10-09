import type { DescriptionsProps } from "antd"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import Link from "next/link"

export function getDatasetProofDescriptionItems(
    datasetOverview: DatasetOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Root Hash",
            children: datasetOverview.rootHash,
        },
        {
            key: "2",
            label: "Leave Count",
            children: datasetOverview.proofs
                ? Object.values(datasetOverview.proofs).length
                : 0,
        },
        {
            key: "3",
            label: "Completed",
            children: datasetOverview.completed,
        },
    ]
}

export function getReplicasDescriptionItems(
    datasetOverview: DatasetOverviewType,
    id: number
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "replica id",
            children: id,
        },
        {
            key: "2",
            label: "replica country",
            children: datasetOverview.replicasDetail[id].country,
        },
    ]
}
export function getDatasetChallengeDescriptionItems(
    datasetOverview: DatasetOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Challenge Count",
            children: datasetOverview.proofChallenge
                ? Object.values(datasetOverview.proofChallenge).length
                : 0,
        },
    ]
}

export function getDatasetDisputeDescriptionItems(
    datasetOverview: DatasetOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Dispute Count",
            children: datasetOverview.disputes
                ? Object.values(datasetOverview.disputes).length
                : 0,
        },
    ]
}

export function getDatasetReplicasDescriptionItems(
    datasetOverview: DatasetOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Replicas Count",
            children: datasetOverview.replicasCountries?.length,
        },
    ]
}
