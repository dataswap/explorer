import React from "react"
import { Descriptions } from "antd"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields, enumToString } from "@unipackage/utils"
import Link from "next/link"
import {
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
} from "../../../config/links"
import { DatasetRequirement, MatchingState } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<DatasetRequirement>
}
export function DatasetRequirementDescription({ data }: IProps) {
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
            dataPreparers: {
                children: (
                    <div>
                        {data.dataPreparers.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))}
                    </div>
                ),
            },
            storageProviders: {
                children: (
                    <div>
                        {data.storageProviders.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))}
                    </div>
                ),
            },
            cityCodes: {
                children: (
                    <div>
                        {data.cityCodes.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))}
                    </div>
                ),
            },
            matchings: {
                children: (
                    <div>
                        {data.matchings?.map((data, index) => (
                            <div key={index}>
                                ({index + 1})Matching Id:{" "}
                                {data.matchingId !== 0 ? (
                                    <Link
                                        href={`${config_matchingDetailPageRoot}/${data.matchingId}`}
                                    >
                                        {data.matchingId}
                                    </Link>
                                ) : (
                                    "None"
                                )}
                                ,Matching State:
                                {enumToString(
                                    MatchingState,
                                    data.matchingState
                                )}
                                ,Count Completion Rate:{data.finishedCount}/
                                {data.totalCount}
                                ,Size Completion Rate:{data.finishedSize}/
                                {data.totalSize}
                            </div>
                        ))}
                    </div>
                ),
            },
        },
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return (
        <Descriptions
            title="DatasetRequirement Detail Info"
            items={descriptionItems}
            column={1}
        />
    )
}
