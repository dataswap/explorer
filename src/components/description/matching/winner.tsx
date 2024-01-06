import React from "react"
import { convertDataToItems, Descriptions } from "@unipackage/webkit"
import { MatchingBid } from "../../../shared/types/index"

interface IProps {
    data: MatchingBid
}
export function MatchingWinnerDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(data, {})
    return <Descriptions title="Winner Info" items={descriptionItems} />
}
