import React from "react"
import Link from "next/link"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import { config_datasetDetailPageRoot } from "../../../config/links"

interface IProps {
    data: ValueFields<DatasetMetadata>
}

function getMapper(data: ValueFields<DatasetMetadata>) {
    return {
        datasetId: (value: any) => (
            <Link href={`${config_datasetDetailPageRoot}/${value}`}>
                {value}
            </Link>
        ),
        // replicasCountries: (value: any) => value?.join(","),
        isPublic: (value: any) => (value ? "Yes" : "No"),
        // operate: (value: any) => (
        //     <Link href={`/dataset/submit/${value}/${data.id}`}>{value}</Link>
        // ),
    }
}

export function DatasetMetadataDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        //@ts-ignore
        keyBlacklist: ["_id", "__v"],
    })
    return (
        <Descriptions title="Dataset Metadata Info" items={descriptionItems} />
    )
}

export function DatasetOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        keyWhitelist: ["datasetId", "name", "sizeInBytes", "submitter"],
    })
    return (
        <Descriptions title="Dataset Overview Info" items={descriptionItems} />
    )
}
