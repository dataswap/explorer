import type { DescriptionsProps } from "antd"
import { MatchingOverviewType } from "@/types/matching"
import Link from "next/link"

export function getMatchingOverviewDescriptionItems(
    overview: MatchingOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Id",
            children: (
                <Link href={`/matching/detail/${overview.id}`}>
                    {overview.id}
                </Link>
            ),
        },
        {
            key: "2",
            label: "Dataset ID",
            children: (
                <Link href={`/dataset/detail/${overview.datasetId}`}>
                    {overview.datasetId}
                </Link>
            ),
        },
        {
            key: "3",
            label: "Replica ID",
            children: overview.replicaId,
        },
        {
            key: "4",
            label: "Create Time",
            children: overview.createdTime,
        },
        {
            key: "5",
            label: "submitter",
            children: overview.submitter,
        },
        {
            key: "6",
            label: "size",
            children: overview.size,
        },
        {
            key: "7",
            label: "Initial Price(FIL)",
            children: overview.initialPrice,
        },
    ]
}

export function getMatchingDetailDescriptionItems(
    overview: MatchingOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Id",
            children: (
                <Link href={`/matching/detail/${overview.id}`}>
                    {overview.id}
                </Link>
            ),
        },
        {
            key: "2",
            label: "Dataset ID",
            children: (
                <Link href={`/dataset/detail/${overview.datasetId}`}>
                    {overview.datasetId}
                </Link>
            ),
        },
        {
            key: "3",
            label: "Replica ID",
            children: overview.replicaId,
        },
        {
            key: "4",
            label: "Create Time",
            children: overview.createdTime,
        },
        {
            key: "5",
            label: "submitter",
            children: overview.submitter,
        },
        {
            key: "6",
            label: "size",
            children: overview.size,
        },
        {
            key: "7",
            label: "Initial Price(FIL)",
            children: overview.initialPrice,
        },
        {
            key: "8",
            label: "Auction Period",
            children: overview.auctionPeriod.join("-"),
        },
        {
            key: "9",
            label: "Storage CompletePeriod(Days)",
            children: overview.storageCompletePeriod,
        },
        {
            key: "10",
            label: "Storage Lifecycle(Days)",
            children: overview.storageLifecycle,
        },
        {
            key: "11",
            label: "Data Transfer Type",
            children: overview.dataTransferType,
        },
        {
            key: "12",
            label: "Data Location",
            children: overview.datalocation,
        },
        {
            key: "13",
            label: "DP Bandwidth Speed",
            children: overview.dpBandwidthSpeed,
        },
        {
            key: "14",
            label: "SP Location",
            children: overview.spLocation,
        },
        {
            key: "15",
            label: "SP Bandwidth Speed",
            children: overview.spBandwidthSpeed,
        },
        {
            key: "16",
            label: "State",
            children: overview.state,
        },
        {
            key: "17",
            label: "Operate",
            children: (
                <>
                    <Link
                        href={`/matching/submit/${overview.operate}/${overview.id}`}
                    >
                        {overview.operate}
                    </Link>
                </>
            ),
        },
    ]
}

export function getMatchingBidsDescriptionItems(
    overview: MatchingOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Bids count",
            children: overview.bids ? Object.values(overview.bids).length : 0,
        },
    ]
}

export function getWinnerDesc(
    overview: MatchingOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Bidder",
            children: overview.winner?.bidder,
        },
        {
            key: "2",
            label: "Bid",
            children: overview.winner?.bid,
        },
        {
            key: "3",
            label: "Bid Time",
            children: overview.winner?.bidTime,
        },
    ]
}
