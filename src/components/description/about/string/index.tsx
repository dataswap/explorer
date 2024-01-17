import React from "react"
import { Descriptions } from "antd"

interface IProps {
    title: string
    data: string
}
export function StringDescription({ title, data }: IProps) {
    const descriptionItems = [
        {
            key: data,
            label: "Version",
            children: data,
        },
    ]

    return <Descriptions title={title} items={descriptionItems} />
}
