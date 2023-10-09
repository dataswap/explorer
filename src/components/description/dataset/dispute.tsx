import React from "react"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import {
    convertDataToDescriptionItems,
    Descriptions,
} from "@dataswapjs/webutils"

interface IProps {
    data: DatasetOverviewType
}
export function DatasetDisputeDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(
        data,
        {},
        {
            keyWhitelist: [],
            extra: {
                disputeCount: data.disputes
                    ? Object.values(data.disputes).length
                    : 0,
            },
        }
    )
    return <Descriptions title="Dispute Info" items={descriptionItems} />
}
