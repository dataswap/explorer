import React from "react"
import Link from "next/link"
import { MatchingTarget } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import {
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
} from "../../../config/links"

interface IProps {
    data: ValueFields<MatchingTarget>
}

function getMapper(data: ValueFields<MatchingTarget>) {
    return {
        matchingId: (value: any) => (
            <Link href={`${config_matchingDetailPageRoot}/${value}`}>
                {value}
            </Link>
        ),
        datasetId: (value: any) => (
            <Link href={`${config_datasetDetailPageRoot}/${value}`}>
                {value}
            </Link>
        ),
        cars: (value: any) => value?.join(","),
        dataType: (value: any) => (value ? "MappingFiles" : "Source"),
    }
}

export function MatchingTargetDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        keyBlacklist: ["id"],
    })
    return (
        <Descriptions title="Matching Target Info" items={descriptionItems} />
    )
}
