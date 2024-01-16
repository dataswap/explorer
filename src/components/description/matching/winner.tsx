import React from "react"
import { Descriptions } from "antd"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { MatchingBid } from "../../../shared/types/index"

interface IProps {
    data: MatchingBid
}
export function MatchingWinnerDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(data)
    return <Descriptions title="Winner Info" items={descriptionItems} />
}
