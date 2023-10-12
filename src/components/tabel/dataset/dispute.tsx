import React from "react"
import {
    Tabel,
    generateTabelColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { DatasetDisputeType } from "@dataswapjs/dataswapjs"

interface DatasetDisputeTabelItem {
    key: React.ReactNode
    submitter: string
    da: string
    challenge: string
    disputeProof: string
    result: string
}

interface IProps {
    data: DatasetDisputeType[]
}

export default ({ data }: IProps) => {
    const columns = generateTabelColumns<DatasetDisputeTabelItem>({
        submitter: "20%",
        da: "20%",
        challenge: "20%",
        disputeProof: "20%",
        result: "20%",
    })

    const tabelItems: DatasetDisputeTabelItem[] = convertDataToTableItems<
        DatasetDisputeType,
        DatasetDisputeTabelItem
    >(data, (item) => ({
        key: item.da,
        ...item,
    }))
    return (
        <Tabel<DatasetDisputeTabelItem> columns={columns} data={tabelItems} />
    )
}
