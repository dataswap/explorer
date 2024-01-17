import React from "react"
import { Descriptions } from "antd"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { SyncStatus } from "@/shared/messagehub/get"

interface IProps {
    title: string
    data: SyncStatus
}

export function SyncStatusDescription({ title, data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(data, {
        isRunning: {
            children: data.isRunning ? "Yes" : "No",
        },
    })
    return <Descriptions title={title} items={descriptionItems} column={3} />
}
