import React from "react"
import { Descriptions } from "antd"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import { CarReplica } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<CarReplica>
}
export function CarReplicaDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        {},
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return (
        <Descriptions
            title="CarReplica Detail Info"
            items={descriptionItems}
            column={1}
        />
    )
}
