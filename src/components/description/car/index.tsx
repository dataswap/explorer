import React from "react"
import Link from "next/link"
import { Descriptions } from "antd"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields, enumToString } from "@unipackage/utils"
import {
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
} from "../../../config/links"
import { Car, CarReplicaState, DataType } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<Car>
}
export function CarDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        {
            datasetId: {
                children: (
                    <Link
                        href={`${config_datasetDetailPageRoot}/${data.datasetId}`}
                    >
                        {data.datasetId}
                    </Link>
                ),
            },
            dataType: {
                children: enumToString(DataType, data.dataType!),
                span: 2,
            },
            replicaInfos: {
                children: (
                    <div>
                        {data.replicaInfos?.map((data, index) => (
                            <div key={index}>
                                ({index + 1})matchingId:{" "}
                                {data.matchingId !== 0 ? (
                                    <Link
                                        href={`${config_matchingDetailPageRoot}/${data.matchingId}`}
                                    >
                                        {data.matchingId}
                                    </Link>
                                ) : (
                                    "None"
                                )}
                                ,state:
                                {enumToString(CarReplicaState, data.state)}
                            </div>
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
            title="Car Detail Info"
            items={descriptionItems}
            column={1}
        />
    )
}
