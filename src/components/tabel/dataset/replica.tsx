import React from "react"
import {
    Tabel,
    generateTabelColumns,
    convertDataToTableItems,
} from "@dataswapjs/webutils"
import { DatasetReplicasType } from "@dataswapjs/dataswapjs"
import Link from "next/link"

interface DatasetReplicasTabelItem {
    key: React.ReactNode
    id: string
    country: string
    dp: string
    state: string
    operate: React.ReactNode
}

interface IProps {
    data: DatasetReplicasType[]
    datasetId: number
}

export default ({ data, datasetId }: IProps) => {
    const columns = generateTabelColumns<DatasetReplicasTabelItem>({
        id: "20%",
        country: "20%",
        dp: "20%",
        state: "20%",
        operate: "20%",
    })

    const tabelItems: DatasetReplicasTabelItem[] = convertDataToTableItems<
        DatasetReplicasType,
        DatasetReplicasTabelItem
    >(data, (item) => ({
        key: item.id,
        ...item,
        operate: (
            <Link
                href={`/matching/submit/${item.operate}?datasetId=${datasetId}&replicaId=${item.id} `}
            >
                {item.operate}
            </Link>
        ),
    }))

    return (
        <Tabel<DatasetReplicasTabelItem> columns={columns} data={tabelItems} />
    )
}
