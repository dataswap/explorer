import React from "react"
import Link from "next/link"
import {
    generateTableColumns,
    extendWithKeyForTableData,
    ITableProps,
} from "@unipackage/webkit"
import { Table } from "antd"
import { CarReplica, CarReplicaState } from "@dataswapjs/dataswapjs"
import { ValueFields, enumToString } from "@unipackage/utils"
import {
    config_carReplicaDetailPageRoot,
    config_matchingDetailPageRoot,
} from "@/config/links"

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
            align: "center",
        },
        independent: {
            carId: {
                width: "20%",
                render: (value, record) => (
                    <Link
                        href={`${config_carReplicaDetailPageRoot}?carId=${value}&matchingId=${record.matchingId}`}
                    >
                        {value}
                    </Link>
                ),
            },
            matchingId: {
                width: "20%",
                render: (value) => (
                    <Link href={`${config_matchingDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
                hidden: true,
            },
            filecoinClaimId: {
                width: "30%",
                render: (value) => (value > 0 ? value : "None"),
            },
            state: {
                width: "30%",
                render: (value) => enumToString(CarReplicaState, value),
            },
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
