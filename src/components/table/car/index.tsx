import React from "react"
import Link from "next/link"
import { ValueFields } from "@unipackage/utils"
import { Table } from "antd"
import {
    generateTableColumns,
    extendWithKeyForTableData,
    ITableProps,
} from "@unipackage/webkit"
import { Car } from "@dataswapjs/dataswapjs"
import { config_datasetDetailPageRoot } from "../../../config/links"

interface TabelItem
    extends Pick<
        ValueFields<Car>,
        | "datasetId"
        | "carId"
        | "hash"
        | "matchingIds"
        | "replicasCount"
        | "size"
    > {
    key: React.ReactNode
}

export default ({
    data,
    pagination,
    loading,
    onChange,
}: ITableProps<ValueFields<Car>>) => {
    const columns = generateTableColumns<TabelItem>({
        shared: {
            ellipsis: true,
        },
        independent: {
            carId: {
                width: "10%",
            },
            datasetId: {
                width: "18%",
                render: (value) => (
                    <Link href={`${config_datasetDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
            },
            hash: {
                width: "18%",
            },
            size: { width: "18%" },
            replicasCount: { width: "18%" },
            matchingIds: { width: "18%" },
        },
    })

    return (
        <Table<TabelItem>
            columns={columns}
            dataSource={extendWithKeyForTableData<ValueFields<Car>>({
                dataArray: data,
                keyField: "carId",
            })}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
