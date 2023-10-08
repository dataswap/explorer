import React from "react"
import { Tabel, generateTabelColumns } from "@dataswapjs/webutils"
import { DatasetChallengeTabelItem } from "@/types/components/tabel/dataset"
import {
    DatasetOverviewType,
    DatasetChallengeProofType,
} from "@dataswapjs/dataswap-sdk"
import Link from "next/link"
import { convertDataToTableItems } from "@dataswapjs/webutils"

interface IProps {
    data: DatasetChallengeProofType[]
    overview: DatasetOverviewType
    id: number
}

export default ({ data, overview, id }: IProps) => {
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
                    href={`/dataset/submit/${item.operate}/${id}?da=${item.da}`}
                >
                    submit {item.operate}
                </Link>
            ),
    }))

    return (
        <Tabel<DatasetChallengeTabelItem> columns={columns} data={tabelItems} />
    )
}
