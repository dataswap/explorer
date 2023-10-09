import React from "react"
import Link from "next/link"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import { convertDataToItems, Descriptions } from "@dataswapjs/webutils"

interface IProps {
    data: DatasetOverviewType
}

function getMapper(data: DatasetOverviewType) {
    return {
        id: (value: any) => (
            <Link href={`/dataset/detail/${value}`}>{value}</Link>
        ),
        replicasCountries: (value: any) => value?.join(","),
        isPublic: (value: any) => (value ? "Yes" : "No"),
        operate: (value: any) => (
            <Link href={`/dataset/submit/${value}/${data.id}`}>{value}</Link>
        ),
    }
}

export function DatasetDetailDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        keyBlacklist: [],
        extra: {
            replicasRequiredNumber: data.replicasCountries?.length,
        },
    })
    return <Descriptions title="Dataset Info" items={descriptionItems} />
}

export function DatasetOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        keyWhitelist: ["id", "name", "size", "submitter"],
    })
    return (
        <Descriptions title="Dataset Overview Info" items={descriptionItems} />
    )
}
