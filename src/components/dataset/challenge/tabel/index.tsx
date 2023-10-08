import React from "react"
import {
    Tabel,
    generateTabelColumns,
    convertDataToTableItems,
} from "@dataswapjs/webutils"
import {
    DatasetOverviewType,
    DatasetChallengeProofType,
} from "@dataswapjs/dataswap-sdk"
import Link from "next/link"
import { DatasetChallengeTabelItem } from "@/types/components/tabel/dataset"

interface IProps {
    data: DatasetChallengeProofType[]
    overview: DatasetOverviewType
}

export default ({ data, overview }: IProps) => {
    const columns = generateTabelColumns<DatasetChallengeTabelItem>({
        da: "33.33%",
        challenge: "33.33%",
        operate: "33.33%",
    })

    const tabelItems: DatasetChallengeTabelItem[] = convertDataToTableItems<
        DatasetChallengeProofType,
        DatasetChallengeTabelItem
    >(data, (item) => ({
        key: item.da,
        ...item,
        operate: overview.state !== "Approved" &&
            overview.state !== "Reject" && (
                <Link
                    href={`/dataset/submit/${item.operate}/${overview.id}?da=${item.da}`}
                >
                    submit {item.operate}
                </Link>
            ),
    }))

    return (
        <Tabel<DatasetChallengeTabelItem> columns={columns} data={tabelItems} />
    )
}
