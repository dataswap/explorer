import React from "react"
import Link from "next/link"
import { MatchingOverviewType } from "@dataswapjs/dataswap-sdk"
import {
    convertDataToDescriptionItems,
    Descriptions,
} from "@dataswapjs/webutils"

interface IProps {
    data: MatchingOverviewType
}
export function MatchingDetailDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(data, {
        id: (value) => <Link href={`/matching/detail/${value}`}>{value}</Link>,
        datasetId: (value) => (
            <Link href={`/dataset/detail/${value}`}>{value}</Link>
        ),
        auctionPeriod: (value) => value?.join("-"),
        operate: (value) => (
            <>
                <Link href={`/matching/submit/${value}/${data.id}`}>
                    {value}
                </Link>
            </>
        ),
    })
    return (
        <Descriptions title="Matching Detail Info" items={descriptionItems} />
    )
}

export function MatchingOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(
        data,
        {
            id: (value) => (
                <Link href={`/matching/detail/${value}`}>{value}</Link>
            ),
            datasetId: (value) => (
                <Link href={`/dataset/detail/${value}`}>{value}</Link>
            ),
        },
        {
            keyWhitelist: [
                "id",
                "datasetId",
                "replicaId",
                "createdTime",
                "submitter",
                "size",
                "initialPrice",
            ],
        }
    )
    return (
        <Descriptions title="Matching Overview Info" items={descriptionItems} />
    )
}
