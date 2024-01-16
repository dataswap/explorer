import React from "react"
import {
    generateTableColumns,
    extendWithKeyForTableData,
    ITableProps,
} from "@unipackage/webkit"
import { Table } from "antd"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import { ValueFields } from "@unipackage/utils"
import Link from "next/link"
import { config_datasetDetailPageRoot } from "../../../config/links"

interface TabelItem
    extends Pick<
        ValueFields<DatasetMetadata>,
        | "datasetId"
        | "name"
        | "createdBlockNumber"
        | "sizeInBytes"
        | "accessMethod"
        | "submitter"
        | "status"
    > {
    key: React.ReactNode
}

export default ({
    data,
    pagination,
    loading,
    onChange,
}: ITableProps<ValueFields<DatasetMetadata>>) => {
    const columns = generateTableColumns<TabelItem>({
        shared: {
            ellipsis: true,
        },
        independent: {
            datasetId: {
                width: "7%",
                render: (value) => (
                    <Link href={`${config_datasetDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
            },
            name: {
                width: "15%",
                render: (_, record) => (
                    <Link
                        href={`${config_datasetDetailPageRoot}/${record.datasetId}`}
                    >
                        {record.name}
                    </Link>
                ),
            },
            accessMethod: { width: "15%" },
            sizeInBytes: { width: "8%" },
            createdBlockNumber: { width: "15%" },
            submitter: { width: "10%" },
            status: { width: "15%" },
        },
    })

    return (
        <Table<TabelItem>
            columns={columns}
            dataSource={extendWithKeyForTableData<ValueFields<DatasetMetadata>>(
                { dataArray: data, keyField: "datasetId" }
            )}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
