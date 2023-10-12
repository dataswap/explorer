import React from "react"
import { DatasetOverviewType } from "@dataswapjs/dataswapjs"
import { convertDataToItems, Descriptions } from "@dataswapjs/webutils"

interface IProps {
    data: DatasetOverviewType
}

interface ISingleProps extends IProps {
    id: number
}

export function DatasetReplicasDescription({ data }: IProps) {
    const descriptionItems = convertDataToItems(
        data,
        {},
        {
            keyWhitelist: [],
            extra: {
                replicasCount: data.replicasCountries
                    ? Object.values(data.replicasCountries).length
                    : 0,
            },
        }
    )
    return <Descriptions title="Replicas Info" items={descriptionItems} />
}

export function DatasetReplicaDescription({ data, id }: ISingleProps) {
    const descriptionItems = convertDataToItems(
        data,
        {},
        {
            keyWhitelist: [],
            extra: {
                replicaId: id,
                replicaCountry: data.replicasDetail[id].country,
            },
        }
    )
    return <Descriptions title="Replica Info" items={descriptionItems} />
}
