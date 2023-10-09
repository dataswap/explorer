import React from "react"
import Link from "next/link"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import {
    convertDataToDescriptionItems,
    Descriptions,
} from "@dataswapjs/webutils"

interface IProps {
    data: DatasetOverviewType
}
export function DatasetDetailDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(
        data,
        {
            id: (value) => (
                <Link href={`/dataset/detail/${value}`}>{value}</Link>
            ),
            replicasCountries: (value) => value?.join(","),
            isPublic: (value) => (value ? "Yes" : "No"),
            operate: (value) => (
                <Link href={`/dataset/submit/${value}/${data.id}`}>
                    {value}
                </Link>
            ),
        },
        {
            keyBlacklist: [],
            // keyWhitelist:[],
            extra: {
                replicasRequiredNumber: data.replicasCountries?.length,
            },
        }
    )
    return <Descriptions title="Dataset Info" items={descriptionItems} />
}

export function DatasetOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(
        data,
        {
            id: (value) => (
                <Link href={`/dataset/detail/${value}`}>{value}</Link>
            ),
        },
        {
            keyWhitelist: ["id", "name", "size", "submitter"],
        }
    )
    return (
        <Descriptions title="Dataset Overview Info" items={descriptionItems} />
    )
}
