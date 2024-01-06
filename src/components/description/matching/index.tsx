import React from "react"
import Link from "next/link"
import { MatchingMetadata } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import {
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
} from "../../../config/links"

interface IProps {
    data: ValueFields<MatchingMetadata>
}

function getMapper(data: ValueFields<MatchingMetadata>) {
    return {
        matchingId: (value: any) =>
            value ? (
                <Link href={`${config_matchingDetailPageRoot}/${value}`}>
                    {value}
                </Link>
            ) : (
                ""
            ),
        datasetId: (value: any) => (
            <Link href={`${config_datasetDetailPageRoot}/${value}`}>
                {value}
            </Link>
        ),
    }
}

export function MatchingMetadataDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        keyBlacklist: ["id"],
    })
    return (
        <Descriptions title="Matching Metadata Info" items={descriptionItems} />
    )
}

export function MatchingOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        keyWhitelist: [
            "datasetId",
            "replicaIndex",
            "matchingId",
            "initiator",
            "createdBlockNumber",
            "bidSelectionRule",
        ],
    })
    return (
        <Descriptions title="Matching Overview Info" items={descriptionItems} />
    )
}
