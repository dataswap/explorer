import React from "react"
import { Descriptions } from "antd"
import { ValueFields } from "@unipackage/utils"
import {
    DescriptionsItemTypeWithOptionalChildren,
    convertDataToDescriptionsItems,
} from "@unipackage/webkit"
import Link from "next/link"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import { config_datasetDetailPageRoot } from "../../../config/links"

interface IProps {
    data: ValueFields<DatasetMetadata>
}

function generateSpecialItem(data: ValueFields<DatasetMetadata>): {
    [key in keyof DatasetMetadata]?: DescriptionsItemTypeWithOptionalChildren
} {
    return {
        description: {
            span: 3,
        },
        source: {
            span: 3,
        },
        accessMethod: {
            span: 3,
        },
        datasetId: {
            children: (
                <Link
                    href={`${config_datasetDetailPageRoot}/${data.datasetId}`}
                >
                    {data.datasetId}
                </Link>
            ),
            span: 1,
        },
        isPublic: {
            children: data.isPublic ? "Yes" : "No",
        },
    }
}

export function DatasetMetadataDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        generateSpecialItem(data),
        {
            //@ts-ignore
            keyBlacklist: ["_id", "__v"],
        }
    )
    return (
        <Descriptions title="Dataset Metadata Info" items={descriptionItems} />
    )
}

export function DatasetOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        generateSpecialItem(data),
        {
            keyWhitelist: ["datasetId", "name", "sizeInBytes", "submitter"],
        }
    )
    return (
        <Descriptions title="Dataset Overview Info" items={descriptionItems} />
    )
}
