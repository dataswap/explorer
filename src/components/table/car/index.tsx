import React from "react"
import {
    generateTableColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { Table } from "antd"
import { Car } from "@dataswapjs/dataswapjs"
import { FromType, ValueFields } from "@unipackage/utils"
import Link from "next/link"
import type { TablePaginationConfig } from "antd/es/table"
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
    data: ValueFields<Car>[]
    pagination: TablePaginationConfig
    loading: boolean
    onChange: (pagination: TablePaginationConfig) => void
}

export default ({ data, pagination, loading, onChange }: IProps) => {
    const columns = generateTableColumns<CarTabelItem>({
        carId: "10%",
        datasetId: "18%",
        hash: "18%",
        size: "18%",
        replicasCount: "18%",
        matchingIds: "18%",
    })

    const tabelItems: CarTabelItem[] = convertDataToTableItems<
        ValueFields<Car>,
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

    return (
        <Table<CarTabelItem>
            columns={columns}
            dataSource={tabelItems}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
