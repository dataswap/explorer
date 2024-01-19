import React from "react"
import { Descriptions } from "antd"
import Link from "next/link"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields, enumToString } from "@unipackage/utils"
import { config_datasetDetailPageRoot } from "../../../config/links"
import { DatasetProofMetadata, DataType } from "@dataswapjs/dataswapjs"

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
                children: enumToString(DataType, data.dataType!),
                span: 2,
            },
            mappingFilesAccessMethod: {
                children: (
                    <>
                        {data.mappingFilesAccessMethod ? (
                            <a href={`${data.mappingFilesAccessMethod}`}>
                                {data.mappingFilesAccessMethod}
                            </a>
                        ) : (
                            "None"
                        )}
                    </>
                ),
                span: 3,
            },
            valid: {
                children: data.valid ? "Yes" : "No",
            },
        },
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return <Descriptions title="Proof Info" items={descriptionItems} />
}
