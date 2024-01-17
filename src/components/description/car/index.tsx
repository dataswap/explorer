import React from "react"
import { Descriptions } from "antd"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import { Car } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<Car>
}
export function CarDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        {
            dataType: {
                children: data.dataType ? "MappingFiles" : "Source",
                span: 2,
            },
        },
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return (
        <Descriptions
            title="Car Detail Info"
            items={descriptionItems}
            column={1}
        />
    )
}
