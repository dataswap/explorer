import React from "react"
import { Descriptions } from "antd"
import { ValueFields, enumToString } from "@unipackage/utils"
import {
    DescriptionsItemTypeWithOptionalChildren,
    convertDataToDescriptionsItems,
} from "@unipackage/webkit"
import Link from "next/link"
import { config_datasetDetailPageRoot } from "../../../config/links"
import { DatasetMetadata, DatasetState } from "@dataswapjs/dataswapjs"

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
            children: <a href={`${data.source}`}>{data.source}</a>,
            span: 3,
        },
        accessMethod: {
            children: <a href={`${data.accessMethod}`}>{data.accessMethod}</a>,
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
        status: {
            children: data.status
                ? enumToString(DatasetState, data.status)
                : "None",
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
