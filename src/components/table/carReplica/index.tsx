import React from "react"
import {
    generateTableColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { Table } from "antd"
import { CarReplica } from "@dataswapjs/dataswapjs"
import type { TablePaginationConfig } from "antd/es/table"
import { FromType, ValueFields } from "@unipackage/utils"

interface CarReplicaTabelItem
    extends FromType<
        ValueFields<CarReplica>,
        "filecoinClaimId" | "matchingId" | "state"
    > {
    key: React.ReactNode
    carId: React.ReactNode
}

interface IProps {
    data: ValueFields<CarReplica>[]
    pagination: TablePaginationConfig
    loading: boolean
    onChange: (pagination: TablePaginationConfig) => void
}

export default ({ data, pagination, loading, onChange }: IProps) => {
    const columns = generateTableColumns<CarReplicaTabelItem>({
        carId: "20%",
        matchingId: "20%",
        filecoinClaimId: "30%",
        state: "30%",
    })

    const tabelItems: CarReplicaTabelItem[] = convertDataToTableItems<
        ValueFields<CarReplica>,
        CarReplicaTabelItem
    >(data, (item) => ({
        key: item.matchingId.toString(),
        //TODO:add carId
        carId: "",
        matchingId: item.matchingId,
        filecoinClaimId: item.filecoinClaimId,
        state: item.state,
    }))

    return (
        <Table<CarReplicaTabelItem>
            columns={columns}
            dataSource={tabelItems}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
