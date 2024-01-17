import React from "react"
import { Descriptions } from "antd"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import { DatasetRequirement } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<DatasetRequirement>
}
export function DatasetRequirementDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        {
            dataPreparers: {
                children: (
                    <div>
                        {data.dataPreparers.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))}
                    </div>
                ),
            },
            storageProviders: {
                children: (
                    <div>
                        {data.storageProviders.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))}
                    </div>
                ),
            },
            cityCodes: {
                children: (
                    <div>
                        {data.cityCodes.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))}
                    </div>
                ),
            },
        },
        {
            //@ts-ignore
            keyBlacklist: ["id", "_id", "__v"],
        }
    )
    return (
        <Descriptions
            title="DatasetRequirement Detail Info"
            items={descriptionItems}
            column={1}
        />
    )
}
