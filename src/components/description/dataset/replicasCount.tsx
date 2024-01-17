import React from "react"
import { Descriptions } from "antd"

interface IProps {
    data: number
}
export function ReplicasCountDescription({ data }: IProps) {
    const descriptionItems = [
        {
            key: data,
            label: "ReplicasCount",
            children: data,
        },
    ]

    return <Descriptions title="Replicas Count" items={descriptionItems} />
}
