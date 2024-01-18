import React from "react"
import {
    generateTableColumns,
    extendWithKeyForTableData,
    ITableProps,
} from "@unipackage/webkit"
import { Table } from "antd"
import { DatasetMetadata, DatasetState } from "@dataswapjs/dataswapjs"
import { ValueFields, enumToString } from "@unipackage/utils"
import Link from "next/link"
import { config_datasetDetailPageRoot } from "../../../../config/links"

interface TabelItem
    extends Pick<
        ValueFields<DatasetMetadata>,
        | "datasetId"
        | "name"
        | "createdBlockNumber"
        | "sizeInBytes"
        | "source"
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
            align: "center",
        },
        independent: {
            datasetId: {
                width: "10%",
                render: (value) => (
                    <Link href={`${config_datasetDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
            },
            name: {
                width: "15%",
            },
            source: {
                width: "15%",
                render: (value) => <a href={`${value}`}>{value}</a>,
            },
            submitter: { width: "15%" },
            createdBlockNumber: { width: "15%" },
            sizeInBytes: { width: "15%" },
            status: {
                width: "15%",
                render: (value) => enumToString(DatasetState, value),
            },
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
