import React from "react"
import { Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableRowSelection } from "antd/es/table/interface"

export interface IDatasetProofTabel {
    key: React.ReactNode
    hash: string
    cid: string
    size: string
}

const columns: ColumnsType<IDatasetProofTabel> = [
    {
        title: "Hash",
        dataIndex: "hash",
        key: "hash",
        width: "33.3%",
    },
    {
        title: "Cid",
        dataIndex: "cid",
        key: "cid",
        width: "33.3%",
    },
    {
        title: "Size",
        dataIndex: "size",
        key: "size",
        width: "33.3%",
    },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IDatasetProofTabel> = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        )
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
    },
}

interface IProps {
    data: IDatasetProofTabel[]
}
// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ data }: IProps) => {
    // const [checkStrictly, setCheckStrictly] = useState(false);
    return (
        <>
            <Space align="center" style={{ marginBottom: 16 }}>
                {/* CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} /> */}
            </Space>
            <Table
                columns={columns}
                // rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={data}
            />
        </>
    )
}
