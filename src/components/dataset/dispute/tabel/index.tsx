import React from "react"
import { Tabel, generateTabelColumns } from "@dataswapjs/webutils"

interface IProps {
    data: DatasetDisputeTabelItem[]
}

interface DatasetDisputeTabelItem {
    key: React.ReactNode
    submitter: string
    da: string
    challenge: string
    disputeProof: string
    result: string
}

export default ({ data }: IProps) => {
    const columns = generateTabelColumns<DatasetDisputeTabelItem>({
        submitter: "20%",
        da: "20%",
        challenge: "20%",
        disputeProof: "20%",
        result: "20%",
    })
    return <Tabel<DatasetDisputeTabelItem> columns={columns} data={data} />
}
