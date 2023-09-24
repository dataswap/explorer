import React from "react"
import { Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableRowSelection } from "antd/es/table/interface"

export interface IMatchingOverviewTabel {
    key: React.ReactNode
    id: React.ReactNode
    datasetId: React.ReactNode
    replicaId: string
    createdTime: string
    submitter: string
    size: string
    initialPrice: string
    state: string
    operate: React.ReactNode
}

const columns: ColumnsType<IMatchingOverviewTabel> = [
    {
        title: "Id",
        dataIndex: "id",
        key: "id",
        width: "7.5%",
    },
    {
        title: "Dataset Id",
        dataIndex: "datasetId",
        key: "datasetId",
        width: "10%",
    },
    {
        title: "Replica Id",
        dataIndex: "replicaId",
        key: "replicaId",
        width: "7.5%",
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
        title: "Size",
        dataIndex: "size",
        key: "size",
        width: "7.5%",
    },
    {
        title: "Price",
        dataIndex: "initialPrice",
        key: "initialPrice",
        width: "7.5%",
    },
    {
        title: "State",
        dataIndex: "state",
        key: "state",
        width: "15%",
    },
    {
        title: "Operate ",
        dataIndex: "operate",
        key: "operate",
        width: "15%",
    },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IMatchingOverviewTabel> = {
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
    data: IMatchingOverviewTabel[]
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
