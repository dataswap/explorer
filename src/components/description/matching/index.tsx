import React from "react"
import { Descriptions } from "antd"
import { ValueFields } from "@unipackage/utils"
import {
    DescriptionsItemTypeWithOptionalChildren,
    convertDataToDescriptionsItems,
} from "@unipackage/webkit"
import Link from "next/link"
import {
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
} from "../../../config/links"
import { MatchingMetadata } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<MatchingMetadata>
}

function generateSpecialItem(data: ValueFields<MatchingMetadata>): {
    [key in keyof MatchingMetadata]?: DescriptionsItemTypeWithOptionalChildren
} {
    return {
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
        matchingId: {
            children: (
                <Link
                    href={`${config_matchingDetailPageRoot}/${data.matchingId}`}
                >
                    {data.matchingId}
                </Link>
            ),
            span: 1,
        },
    }
}

export function MatchingMetadataDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        generateSpecialItem(data),
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return (
        <Descriptions title="Matching Metadata Info" items={descriptionItems} />
    )
}

export function MatchingOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        generateSpecialItem(data),
        {
            keyWhitelist: [
                "datasetId",
                "replicaIndex",
                "matchingId",
                "initiator",
                "createdBlockNumber",
                "bidSelectionRule",
            ],
        }
    )
    return (
        <Descriptions title="Matching Overview Info" items={descriptionItems} />
    )
}
