import React from "react"
import { MatchingOverviewType } from "@dataswapjs/dataswap-sdk"
import {
    convertDataToDescriptionItems,
    Descriptions,
} from "@dataswapjs/webutils"

interface IProps {
    data: MatchingOverviewType
}
export function MatchingWinnerDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(
        data,
        {},
        {
            keyWhitelist: [],
            extra: {
                bidder: data.winner?.bidder,
                bid: data.winner?.bid,
                bidTime: data.winner?.bidTime,
            },
        }
    )
    return <Descriptions title="Winner Info" items={descriptionItems} />
}
