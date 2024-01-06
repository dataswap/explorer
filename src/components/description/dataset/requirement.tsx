import React from "react"
import { DatasetRequirement } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import Link from "next/link"
import { config_datasetDetailPageRoot } from "../../../config/links"

interface IProps {
    data: ValueFields<DatasetRequirement>
}

const mapper = {
    datasetId: (value: any) => (
        <Link href={`${config_datasetDetailPageRoot}/${value}`}>{value}</Link>
    ),
    dataPreparers: (value: any) => value?.join(","),
    storageProviders: (value: any) => value?.join(","),
    cityCodes: (value: any) => value?.join(","),
}
interface ISingleProps extends IProps {
    id: number
}

export function DatasetRequirementDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, mapper, {
        keyBlacklist: ["id"],
    })
    return (
        <Descriptions
            title="Dataset Requirement Info"
            items={descriptionItems}
        />
    )
}
