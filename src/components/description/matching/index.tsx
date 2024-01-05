import React from "react"
import Link from "next/link"
import { MatchingOverviewType } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@unipackage/webkit"

interface IProps {
    data: MatchingOverviewType
}

function getMapper(data: MatchingOverviewType) {
    return {
        id: (value: any) => (
            <Link href={`/matching/detail/${value}`}>{value}</Link>
        ),
        datasetId: (value: any) => (
            <Link href={`/dataset/detail/${value}`}>{value}</Link>
        ),
        auctionPeriod: (value: any) => value?.join("-"),
        operate: (value: any) => (
            <>
                <Link href={`/matching/submit/${value}/${data.id}`}>
                    {value}
                </Link>
            </>
        ),
    }
}

export function MatchingDetailDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data))
    return (
        <Descriptions title="Matching Detail Info" items={descriptionItems} />
    )
}

export function MatchingOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        keyWhitelist: [
            "id",
            "datasetId",
            "replicaId",
            "createdTime",
            "submitter",
            "size",
            "initialPrice",
        ],
    })
    return (
        <Descriptions title="Matching Overview Info" items={descriptionItems} />
    )
}
