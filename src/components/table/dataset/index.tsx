import React from "react"
import {
    generateTableColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { Table } from "antd"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import { FromType, ValueFields } from "@unipackage/utils"
import type { TablePaginationConfig } from "antd/es/table"
import Link from "next/link"
import { config_datasetDetailPageRoot } from "../../../config/links"

interface DatasetTabelItem
    extends FromType<
        ValueFields<DatasetMetadata>,
        "accessMethod" | "submitter" | "status"
    > {
    key: React.ReactNode
    id: React.ReactNode
    name: React.ReactNode
    createdHeight?: number
    createdTime: string
    size: string
}

interface IProps {
    data: ValueFields<DatasetMetadata>[]
    pagination: TablePaginationConfig
    loading: boolean
    onChange: (pagination: TablePaginationConfig) => void
}

export default ({ data, pagination, loading, onChange }: IProps) => {
    const columns = generateTableColumns<DatasetTabelItem>({
        id: "7%",
        name: "15%",
        accessMethod: "15%",
        size: "8%",
        createdHeight: "15%",
        createdTime: "15%",
        submitter: "10%",
        status: "15%",
    })

    const tabelItems: DatasetTabelItem[] = convertDataToTableItems<
        ValueFields<DatasetMetadata>,
        DatasetTabelItem
    >(data, (item) => ({
        key: item.datasetId,
        id: (
            <Link href={`${config_datasetDetailPageRoot}/${item.datasetId}`}>
                {item.datasetId}
            </Link>
        ),
        name: (
            <Link href={`${config_datasetDetailPageRoot}/${item.datasetId}`}>
                {item.name}
            </Link>
        ),
        createdHeight: item.createdBlockNumber,
        createdTime: "",
        size: item.sizeInBytes.toString(),
        status: item.status,
        submitter: item.submitter,
        accessMethod: item.accessMethod,
    }))

    return (
        <Table<DatasetTabelItem>
            columns={columns}
            dataSource={tabelItems}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
