import type { DescriptionsProps } from "antd"
import { DatasetOverviewType, DatasetChallengeProofType } from "@/types/dataset"
import Link from "next/link"

export function getDatasetDetailDescriptionItems(
    datasetOverview: DatasetOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Id",
            children: (
                <Link href={`/dataset/detail/${datasetOverview.id}`}>
                    {datasetOverview.id}
                </Link>
            ),
        },
        {
            key: "2",
            label: "Name",
            children: datasetOverview.name,
        },
        {
            key: "3",
            label: "Description",
            children: datasetOverview.description,
        },
        {
            key: "4",
            label: "Size",
            children: datasetOverview.size,
        },
        {
            key: "5",
            label: "Industry",
            children: datasetOverview.industry,
        },
        {
            key: "6",
            label: "Source",
            children: datasetOverview.source,
        },
        {
            key: "7",
            label: "Access Method",
            children: datasetOverview.accessMethod,
        },
        {
            key: "8",
            label: "Version",
            children: datasetOverview.version,
        },
        {
            key: "9",
            label: "Owner name",
            children: datasetOverview.ownername,
        },
        {
            key: "10",
            label: "Owner country",
            children: datasetOverview.ownercountry,
        },
        {
            key: "11",
            label: "Owner website",
            children: datasetOverview.ownerwebsite,
        },
        {
            key: "12",
            label: "Replicas Required Number",
            children: datasetOverview.replicasCountries?.length,
        },
        {
            key: "13",
            label: "Replicas Required Countries",
            children: datasetOverview.replicasCountries?.join(","),
        },
        {
            key: "14",
            label: "Is public",
            children: datasetOverview.isPublic ? "Yes" : "No",
        },
        {
            key: "15",
            label: "Created Time",
            children: datasetOverview.createdTime,
        },
        {
            key: "16",
            label: "Created Height",
            children: datasetOverview.createdHeight,
        },
        {
            key: "17",
            label: "Submitter",
            children: datasetOverview.submitter,
        },
        {
            key: "18",
            label: "State",
            children: datasetOverview.state,
        },
        {
            key: "17",
            label: "Available Submit",
            children: (
                <Link
                    href={`/dataset/submit/${datasetOverview.operate}/${datasetOverview.id}`}
                >
                    {datasetOverview.operate}
                </Link>
            ),
        },
    ]
}

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
export function getDatasetDescriptionItems(
    datasetOverview: DatasetOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Id",
            children: (
                <Link href={`/dataset/detail/${datasetOverview.id}`}>
                    {datasetOverview.id}
                </Link>
            ),
        },
        {
            key: "2",
            label: "Name",
            children: datasetOverview.name,
        },
        {
            key: "3",
            label: "Size",
            children: datasetOverview.size,
        },
        {
            key: "4",
            label: "Client",
            children: datasetOverview.submitter,
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
