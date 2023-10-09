import React from "react"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import {
    convertDataToDescriptionItems,
    Descriptions,
} from "@dataswapjs/webutils"

interface IProps {
    data: DatasetOverviewType
}
export function DatasetChallengeDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(
        data,
        {},
        {
            keyWhitelist: [],
            extra: {
                challengeCount: data.proofChallenge
                    ? Object.values(data.proofChallenge).length
                    : 0,
            },
        }
    )
    return <Descriptions title="Challenge Info" items={descriptionItems} />
}
