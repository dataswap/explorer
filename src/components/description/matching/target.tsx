import React from "react"
import { Descriptions } from "antd"
import { ValueFields, enumToString } from "@unipackage/utils"
import {
    DescriptionsItemTypeWithOptionalChildren,
    convertDataToDescriptionsItems,
} from "@unipackage/webkit"
import Link from "next/link"
import {
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
    config_requirementDetailPageRoot,
} from "../../../config/links"
import { MatchingTarget, DataType } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<MatchingTarget>
}

function generateSpecialItem(data: ValueFields<MatchingTarget>): {
    [key in keyof MatchingTarget]?: DescriptionsItemTypeWithOptionalChildren
} {
    return {
        datasetID: {
            children: (
                <Link
                    href={`${config_datasetDetailPageRoot}/${data.datasetID}`}
                >
                    {data.datasetID}
                </Link>
            ),
        },
        matchingId: {
            children: (
                <Link
                    href={`${config_matchingDetailPageRoot}/${data.matchingId}`}
                >
                    {data.matchingId}
                </Link>
            ),
        },
        cars: {
            children: data.cars.join(","),
        },
        dataType: {
            children: enumToString(DataType, data.dataType!),
        },
        replicaIndex: {
            children: (
                <Link
                    href={`${config_requirementDetailPageRoot}?datasetid=${
                        data.datasetID
                    }&index=${data.replicaIndex?.toString()}`}
                >
                    {data.replicaIndex?.toString()}
                </Link>
            ),
        },
        associatedMappingFilesMatchingID: {
            children: (
                <>
                    {data.associatedMappingFilesMatchingID ? (
                        <Link
                            href={`${config_matchingDetailPageRoot}/${data.associatedMappingFilesMatchingID}`}
                        >
                            {data.associatedMappingFilesMatchingID}
                        </Link>
                    ) : (
                        "None"
                    )}
                </>
            ),
        },
    }
}

export function MatchingTargetDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        generateSpecialItem(data),
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return (
        <Descriptions title="Matching Target Info" items={descriptionItems} />
    )
}
