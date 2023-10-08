import React from "react"
import { Tabel, generateTabelColumns } from "@dataswapjs/webutils"
import { DatasetDisputeTabelItem } from "@/types/components/tabel/dataset"

interface IProps {
    data: DatasetDisputeTabelItem[]
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
