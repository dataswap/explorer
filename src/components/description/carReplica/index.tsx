import React from "react"
import { Descriptions } from "antd"
import Link from "next/link"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields, enumToString } from "@unipackage/utils"
import {
    config_matchingDetailPageRoot,
    config_carDetailPageRoot,
} from "../../../config/links"
import { CarReplica, CarReplicaState } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<CarReplica>
}
export function CarReplicaDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        {
            carId: {
                children: (
                    <>
                        {data.carId ? (
                            <Link
                                href={`${config_carDetailPageRoot}/${data.carId.toString()}`}
                            >
                                {data.carId.toString()}
                            </Link>
                        ) : (
                            "None"
                        )}
                    </>
                ),
            },
            matchingId: {
                children: (
                    <>
                        {data.matchingId ? (
                            <Link
                                href={`${config_matchingDetailPageRoot}/${data.matchingId.toString()}`}
                            >
                                {data.matchingId.toString()}
                            </Link>
                        ) : (
                            "None"
                        )}
                    </>
                ),
            },
            state: {
                children: enumToString(CarReplicaState, data.state),
            },
            filecoinClaimId: {
                children:
                    data.filecoinClaimId.toString() !== "0"
                        ? data.filecoinClaimId.toString()
                        : "None",
            },
        },
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
