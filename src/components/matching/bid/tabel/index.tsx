import React from "react"
import { Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableRowSelection } from "antd/es/table/interface"

export interface IMatchingBidsTabel {
    key: React.ReactNode
    bidder: string
    bid: string
    bidTime: string
}

const columns: ColumnsType<IMatchingBidsTabel> = [
    {
        title: "Bidder",
        dataIndex: "bidder",
        key: "bidder",
        width: "33.3%",
    },
    {
        title: "Bid",
        dataIndex: "bid",
        key: "bid",
        width: "33.3%",
    },
    {
        title: "Bid Time",
        dataIndex: "bidTime",
        key: "bidTime",
        width: "33.3%",
    },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IMatchingBidsTabel> = {
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
    data: IMatchingBidsTabel[]
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
