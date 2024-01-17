import React from "react"
import { Descriptions } from "antd"
import { ValueFields } from "@unipackage/utils"
import {
    DescriptionsItemTypeWithOptionalChildren,
    convertDataToDescriptionsItems,
} from "@unipackage/webkit"
import Link from "next/link"

import { DataswapMessage } from "@dataswapjs/dataswapjs"
import {
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
} from "../../../config/links"

interface IProps {
    data: DataswapMessage
}
function generateSpecialItem(data: ValueFields<DataswapMessage>): {
    [key in keyof DataswapMessage]?: DescriptionsItemTypeWithOptionalChildren
} {
    return {
        matchingId: {
            children: (
                <Link
                    href={`${config_matchingDetailPageRoot}/${data.matchingId}`}
                >
                    {data.matchingId}
                </Link>
            ),
        },
        datasetId: {
            children: (
                <Link
                    href={`${config_datasetDetailPageRoot}/${data.datasetId}`}
                >
                    {data.datasetId}
                </Link>
            ),
        },
    }
}

export function MessageDescription({ data }: IProps) {
    data = {
        ...data,
        //@ts-ignore
        cid: data.cid["/"],
        params: JSON.stringify(data.params),
    }
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        generateSpecialItem(data),
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return (
        <Descriptions
            title="Message Info"
            items={descriptionItems}
            column={1}
        />
    )
}
