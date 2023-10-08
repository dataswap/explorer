import { DatasetDisputeType } from "@dataswapjs/dataswap-sdk"
import { DatasetDisputeTabelItem } from "@/types/components/tabel/dataset"

export function getDatasetDisputeChallengeTabel(
    datasetProofs: DatasetDisputeType[]
): DatasetDisputeTabelItem[] {
    const result: DatasetDisputeTabelItem[] = []

    datasetProofs &&
        datasetProofs.forEach((datasetProof, index) => {
            result[index] = {
                key: datasetProof.da,
                submitter: datasetProof.submitter,
                da: datasetProof.da,
                challenge: datasetProof.challenge,
                disputeProof: datasetProof.disputeProof,
                result: datasetProof.result,
            }
        })

    return result
}
