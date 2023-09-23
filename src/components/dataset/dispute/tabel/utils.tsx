import { DatasetDisputeType } from "@/types/dataset"
import { IDatasetDisputeTabel } from "@/components/dataset/dispute/tabel"

export function getDatasetDisputeChallengeTabel(
    datasetProofs: DatasetDisputeType[]
): IDatasetDisputeTabel[] {
    const result: IDatasetDisputeTabel[] = []

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
