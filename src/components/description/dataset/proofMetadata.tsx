import React from "react"
import { Descriptions } from "antd"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import { DatasetProofMetadata } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<DatasetProofMetadata>
}
export function DatasetProofDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        {
            dataType: {
                children: data.dataType ? "MappingFiles" : "Source",
                span: 2,
            },
            mappingFilesAccessMethod: {
                span: 3,
            },
        },
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return <Descriptions title="Proof Info" items={descriptionItems} />
}
