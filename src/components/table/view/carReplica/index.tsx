import React from "react"
import {
    generateTableColumns,
    extendWithKeyForTableData,
    ITableProps,
} from "@unipackage/webkit"
import { Table } from "antd"
import { CarReplica } from "@dataswapjs/dataswapjs"
import { ValueFields } from "@unipackage/utils"

interface TabelItem
    extends Pick<
        ValueFields<CarReplica>,
        "carId" | "filecoinClaimId" | "matchingId" | "state"
    > {
    key: React.ReactNode
}

export default ({
    data,
    pagination,
    loading,
    onChange,
}: ITableProps<ValueFields<CarReplica>>) => {
    const columns = generateTableColumns<TabelItem>({
        shared: {
            ellipsis: true,
        },
        independent: {
            carId: { width: "20%" },
            matchingId: { width: "20%" },
            filecoinClaimId: { width: "30%" },
            state: { width: "30%" },
        },
    })

    return (
        <Table<TabelItem>
            columns={columns}
            dataSource={extendWithKeyForTableData<ValueFields<CarReplica>>({
                dataArray: data,
                keyField: "carId",
            })}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}