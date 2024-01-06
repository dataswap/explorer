import React from "react"
import { DatasetProofMetadata } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"

interface IProps {
    data: ValueFields<DatasetProofMetadata>
}
export function DatasetProofDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(
        data,
        { dataType: (value: any) => (value ? "MappingFiles" : "Source") },
        {
            keyBlacklist: ["id"],
        }
    )
    return <Descriptions title="Proof Info" items={descriptionItems} />
}
