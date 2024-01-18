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
} from "../../../../config/links"

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
            align: "center",
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
                title: "Dataset/Matching Id",
                width: "15%",
                render: (data, record) => (
                    <>
                        {" "}
                        {data && data > 0 ? (
                            <Link
                                href={`${config_datasetDetailPageRoot}/${data}`}
                            >
                                {data}
                            </Link>
                        ) : (
                            "None"
                        )}
                        {"  /  "}
                        {record.matchingId && record.matchingId > 0 ? (
                            <Link
                                href={`${config_matchingDetailPageRoot}/${record.matchingId}`}
                            >
                                {record.matchingId}
                            </Link>
                        ) : (
                            "None"
                        )}{" "}
                    </>
                ),
            },
            matchingId: {
                width: "10%",
                render: (data) => (
                    <Link href={`${config_matchingDetailPageRoot}/${data}`}>
                        {data}
                    </Link>
                ),
                hidden: true,
            },
            height: { width: "10%" },
            timestamp: { width: "10%", hidden: true },
            from: { width: "10%" },
            to: { width: "10%" },
            method: { width: "20%" },
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
