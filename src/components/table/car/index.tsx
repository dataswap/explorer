import React from "react"
import {
    Table,
    generateTableColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { Car } from "@dataswapjs/dataswapjs"
import { FromType, ValueFields } from "@unipackage/utils"
import Link from "next/link"
import { config_datasetDetailPageRoot } from "../../../config/links"

interface CarTabelItem
    extends FromType<
        ValueFields<Car>,
        "carId" | "hash" | "matchingIds" | "replicasCount" | "size"
    > {
    key: React.ReactNode
    datasetId: React.ReactNode
}

interface IProps {
    data: Car[]
}

export default ({ data }: IProps) => {
    const columns = generateTableColumns<CarTabelItem>({
        carId: "10%",
        datasetId: "18%",
        hash: "18%",
        size: "18%",
        replicasCount: "18%",
        matchingIds: "18%",
    })

    const tabelItems: CarTabelItem[] = convertDataToTableItems<
        Car,
        CarTabelItem
    >(data, (item) => ({
        key: item.carId.toString(),
        datasetId: (
            <Link href={`${config_datasetDetailPageRoot}/${item.datasetId}`}>
                {item.datasetId}
            </Link>
        ),
        carId: item.carId,
        hash: item.hash,
        matchingIds: item.matchingIds,
        replicasCount: item.replicasCount,
        size: item.size,
    }))

    return <Table<CarTabelItem> columns={columns} data={tabelItems} />
}
