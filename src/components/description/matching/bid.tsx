import React from "react"
import { MatchingOverviewType } from "@dataswapjs/dataswap-sdk"
import {
    convertDataToDescriptionItems,
    Descriptions,
} from "@dataswapjs/webutils"

interface IProps {
    data: MatchingOverviewType
}
export function MatchingBidsDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(
        data,
        {},
        {
            keyWhitelist: [],
            extra: {
                bidsCount: data.bids ? Object.values(data.bids).length : 0,
            },
        }
    )
    return <Descriptions title="Bids Info" items={descriptionItems} />
}
