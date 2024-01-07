import React from "react"
import Link from "next/link"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@unipackage/webkit"
import {
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
} from "../../../config/links"

interface IProps {
    data: DataswapMessage
}
function getMapper(data: DataswapMessage) {
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

export function MessageDescription({ data }: IProps) {
    data = {
        ...data,
        //@ts-ignore
        cid: data.cid["/"],
        params: JSON.stringify(data.params),
    }
    const descriptionItems = convertDataToItems(data, getMapper(data), {
        keyBlacklist: ["id"],
    })
    return <Descriptions title="Message Info" items={descriptionItems} />
}
