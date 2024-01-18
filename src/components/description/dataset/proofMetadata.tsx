import React from "react"
import { Descriptions } from "antd"
import Link from "next/link"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import { config_datasetDetailPageRoot } from "../../../config/links"
import { DatasetProofMetadata } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<DatasetProofMetadata>
}
export function DatasetProofMetadataDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        {
            datasetId: {
                children: (
                    <Link
                        href={`${config_datasetDetailPageRoot}/${data.datasetId}`}
                    >
                        {data.datasetId}
                    </Link>
                ),
            },
            dataType: {
                children: data.dataType ? "MappingFiles" : "Source",
                span: 2,
            },
            mappingFilesAccessMethod: {
                children: (
                    <>
                        {data.mappingFilesAccessMethod ? (
                            <Link href={`${data.mappingFilesAccessMethod}`}>
                                {data.mappingFilesAccessMethod}
                            </Link>
                        ) : (
                            "None"
                        )}
                    </>
                ),
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
