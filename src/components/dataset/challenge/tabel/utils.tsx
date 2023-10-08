import {
    DatasetOverviewType,
    DatasetChallengeProofType,
} from "@dataswapjs/dataswap-sdk"
import { DatasetChallengeTabelItem } from "@/types/components/tabel/dataset"
import Link from "next/link"
import { convertDataToTableItems } from "@dataswapjs/webutils"

export function getDatasetProofChallengeTabel(
    datasetProofs: DatasetChallengeProofType[],
    overview: DatasetOverviewType,
    id: number
): DatasetChallengeTabelItem[] {
    const result: DatasetChallengeTabelItem[] = convertDataToTableItems<
        DatasetChallengeProofType,
        DatasetChallengeTabelItem
    >(datasetProofs, (item) => ({
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
    return result
}
