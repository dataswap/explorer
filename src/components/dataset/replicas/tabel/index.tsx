import React from "react"
import { Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableRowSelection } from "antd/es/table/interface"

export interface IDatasetReplicasTabel {
    key: React.ReactNode
    id: string
    country: string
    dp: string
    state: string
    operate: React.ReactNode
}

const columns: ColumnsType<IDatasetReplicasTabel> = [
    {
        title: "Id",
        dataIndex: "id",
        key: "id",
        width: "20%",
    },
    {
        title: "Country",
        dataIndex: "country",
        key: "country",
        width: "20%",
    },
    {
        title: "Dp",
        dataIndex: "dp",
        key: "dp",
        width: "20%",
    },
    {
        title: "State",
        dataIndex: "state",
        key: "state",
        width: "20%",
    },
    {
        title: "Operate",
        dataIndex: "operate",
        key: "operate",
        width: "20%",
    },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IDatasetReplicasTabel> = {
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
    data: IDatasetReplicasTabel[]
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
