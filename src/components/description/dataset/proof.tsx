import React from "react"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import {
    convertDataToDescriptionItems,
    Descriptions,
} from "@dataswapjs/webutils"

interface IProps {
    data: DatasetOverviewType
}
export function DatasetProofDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionItems(
        data,
        {},
        {
            keyWhitelist: ["rootHash", "completed"],
            extra: {
                leaveCount: data.proofs ? Object.values(data.proofs).length : 0,
            },
        }
    )
    return <Descriptions title="Proof Info" items={descriptionItems} />
}
