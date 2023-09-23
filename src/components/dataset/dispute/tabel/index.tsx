import React from "react"
import { Space, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableRowSelection } from "antd/es/table/interface"

export interface IDatasetDisputeTabel {
    key: React.ReactNode
    submitter: string
    da: string
    challenge: string
    disputeProof: string
    result: string
}

const columns: ColumnsType<IDatasetDisputeTabel> = [
    {
        title: "Submmiter",
        dataIndex: "submitter",
        key: "submitter",
        width: "20%",
    },
    {
        title: "Challenge DA",
        dataIndex: "da",
        key: "da",
        width: "20%",
    },
    {
        title: "ChallengeProof",
        dataIndex: "challenge",
        key: "challenge",
        width: "20%",
    },
    {
        title: "DiputeProof",
        dataIndex: "disputeProof",
        key: "disputeProof",
        width: "20%",
    },
    {
        title: "Result",
        dataIndex: "result",
        key: "result",
        width: "20%",
    },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IDatasetDisputeTabel> = {
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
    data: IDatasetDisputeTabel[]
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
