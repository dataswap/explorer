import React from "react"
import { Descriptions } from "antd"
import Link from "next/link"
import { convertDataToDescriptionsItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import { config_datasetDetailPageRoot } from "../../../config/links"
import { DatasetChallenge } from "@dataswapjs/dataswapjs"

interface IProps {
    data: ValueFields<DatasetChallenge>
}
export function DatasetChallengeDescription({ data }: IProps) {
    const descriptionItems = convertDataToDescriptionsItems(
        data,
        {
            leaves: {
                children: (
                    <div>
                        {data.leaves.map((data, index) => (
                            <div key={index}>
                                ({index}):{data}
                            </div>
                        ))}
                    </div>
                ),
            },
            paths: {
                children: (
                    <div>
                        {data.paths.map((data, index) => (
                            <div key={index}>
                                ({index}):{data}
                            </div>
                        ))}
                    </div>
                ),
            },
            siblings: {
                children: (
                    <div>
                        {data.siblings.map((data, index) => (
                            <div key={index}>
                                ({index}): {data.join("  ,  ")}
                            </div>
                        ))}
                    </div>
                ),
            },
            datasetId: {
                children: (
                    <Link
                        href={`${config_datasetDetailPageRoot}/${data.datasetId}`}
                    >
                        {data.datasetId}
                    </Link>
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
            title="Challenge  Detail Info"
            items={descriptionItems}
            column={1}
        />
    )
}
