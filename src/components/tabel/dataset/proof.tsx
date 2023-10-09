import React from "react"
import {
    Tabel,
    generateTabelColumns,
    convertDataToTableItems,
} from "@dataswapjs/webutils"
import { DatasetProofType } from "@dataswapjs/dataswap-sdk"

interface DatasetProofTabelItem {
    key: React.ReactNode
    hash: string
    cid: string
    size: string
}

interface IProps {
    data: DatasetProofType[]
}

export default ({ data }: IProps) => {
    const columns = generateTabelColumns<DatasetProofTabelItem>({
        hash: "33.33%",
        cid: "33.33%",
        size: "33.33%",
    })

    const tabelItems: DatasetProofTabelItem[] = convertDataToTableItems<
        DatasetProofType,
        DatasetProofTabelItem
    >(data, (item) => ({
        key: item.hash,
        ...item,
    }))

    return <Tabel<DatasetProofTabelItem> columns={columns} data={tabelItems} />
}
