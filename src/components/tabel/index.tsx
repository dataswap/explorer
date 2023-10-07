import React from "react"
import { Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { formatTitle } from "@/shared/format.ts"

interface ITableProps<T extends { key: React.ReactNode }> {
    data: T[]
    columns: ColumnsType<T>
}

export function generateColumns<
    T extends { key: React.ReactNode }
>(widthConfig: {
    [key in Exclude<keyof T, "key">]: string
}): ColumnsType<T> {
    return Object.keys(widthConfig as Exclude<T, { key: React.ReactNode }>).map(
        (key) => ({
            title: formatTitle(key),
            dataIndex: key,
            key,
            width: widthConfig?.[key as Exclude<keyof T, "key">] || undefined,
        })
    )
}

export default function TableComponent<T extends { key: React.ReactNode }>({
    data,
    columns,
}: ITableProps<T>) {
    return (
        <>
            <Space align="center" style={{ marginBottom: 16 }}></Space>
            <Table columns={columns} dataSource={data} />
        </>
    )
}
