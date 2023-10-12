import React from "react"
import { DatasetOverviewType } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@dataswapjs/webutils"

interface IProps {
    data: DatasetOverviewType
}
interface ISingleProps extends IProps {
    da: string
}
export function DatasetChallengeOverviewDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(
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

export function DatasetChallengeDescription({ data, da }: ISingleProps) {
    const descriptionItems = convertDataToItems(
        data,
        {},
        {
            keyWhitelist: [],
            extra: {
                da: data?.proofChallenge[da]?.da,
                challenge: data?.proofChallenge[da]?.challenge,
            },
        }
    )
    return (
        <Descriptions title="Challenge Proof Info" items={descriptionItems} />
    )
}
