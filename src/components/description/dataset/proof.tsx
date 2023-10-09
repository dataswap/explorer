import React from "react"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import { convertDataToItems, Descriptions } from "@dataswapjs/webutils"

interface IProps {
    data: DatasetOverviewType
}
export function DatasetProofDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(
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
