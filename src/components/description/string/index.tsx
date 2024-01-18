import React from "react"
import { Descriptions } from "antd"

interface IProps {
    title: string
    label: string
    data: string
}
export function StringDescription({ title, label, data }: IProps) {
    const descriptionItems = [
        {
            key: data,
            label,
            children: data,
        },
    ]

    return <Descriptions title={title} items={descriptionItems} />
}
