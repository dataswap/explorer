import React from "react"
import { Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableRowSelection } from "antd/es/table/interface"

export interface IDatasetChallengeProofTabel {
    key: React.ReactNode
    da: string
    challenge: string
    operate: React.ReactNode
}

const columns: ColumnsType<IDatasetChallengeProofTabel> = [
    {
        title: "DA",
        dataIndex: "da",
        key: "da",
        width: "33.3%",
    },
    {
        title: "Challenge",
        dataIndex: "challenge",
        key: "challenge",
        width: "33.3%",
    },
    {
        title: "Operate",
        dataIndex: "operate",
        key: "operate",
        width: "33.3%",
    },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IDatasetChallengeProofTabel> = {
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
    data: IDatasetChallengeProofTabel[]
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
