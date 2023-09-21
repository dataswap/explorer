import React from "react"
import { Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableRowSelection } from "antd/es/table/interface"

export interface IDatasetOverviewTabel {
    key: React.ReactNode
    id: React.ReactNode
    name: React.ReactNode
    createdHeight: string
    createdTime: string
    size: string
    submitter: string
    state: React.ReactNode
}

const columns: ColumnsType<IDatasetOverviewTabel> = [
    {
        title: "Id",
        dataIndex: "id",
        key: "id",
        width: "10%",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "15%",
    },
    {
        title: "Size",
        dataIndex: "size",
        key: "size",
        width: "10%",
    },
    {
        title: "Created Height",
        dataIndex: "createdHeight",
        key: "createdHeight",
        width: "15%",
    },
    {
        title: "Created Time",
        dataIndex: "createdTime",
        key: "createdTime",
        width: "15%",
    },
    {
        title: "Submitter",
        dataIndex: "submitter",
        key: "submitter",
        width: "15%",
    },
    {
        title: "State",
        dataIndex: "state",
        key: "state",
        width: "20%",
    },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IDatasetOverviewTabel> = {
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
    data: IDatasetOverviewTabel[]
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
