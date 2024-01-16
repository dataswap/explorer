import React from "react"
import { Table } from "antd"
import Link from "next/link"
import {
    generateTableColumns,
    extendWithKeyForTableData,
    ITableProps,
} from "@unipackage/webkit"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import {
    config_matchingDetailPageRoot,
    config_datasetDetailPageRoot,
    config_messageDetailPageRoot,
} from "../../../config/links"

interface TableItem
    extends Pick<
        DataswapMessage,
        | "cid"
        | "datasetId"
        | "matchingId"
        | "height"
        | "timestamp"
        | "from"
        | "to"
        | "method"
        | "status"
        | "return"
    > {
    key: React.ReactNode
}

export default ({
    data,
    pagination,
    loading,
    onChange,
}: ITableProps<DataswapMessage>) => {
    const columns = generateTableColumns<TableItem>({
        shared: {
            ellipsis: true,
        },
        independent: {
            cid: {
                width: "10%",
                render: (data) => (
                    <Link href={`${config_messageDetailPageRoot}/${data["/"]}`}>
                        {data["/"]}
                    </Link>
                ),
            },
            datasetId: {
                width: "10%",
                render: (data) => (
                    <Link href={`${config_datasetDetailPageRoot}/${data}`}>
                        {data}
                    </Link>
                ),
            },
            matchingId: {
                width: "10%",
                render: (data) => (
                    <Link href={`${config_matchingDetailPageRoot}/${data}`}>
                        {data}
                    </Link>
                ),
            },
            height: { width: "10%" },
            timestamp: { width: "10%" },
            from: { width: "7.5%" },
            to: { width: "7.5%" },
            method: { width: "15%" },
            status: { width: "10%" },
            return: { width: "10%" },
        },
    })

    return (
        <Table<TableItem>
            columns={columns}
            dataSource={extendWithKeyForTableData<DataswapMessage>({
                dataArray: data,
                keyField: "cid",
            })}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
