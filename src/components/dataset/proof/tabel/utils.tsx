import { DatasetProofType } from "@/types/dataset"
import { IDatasetProofTabel } from "@/components/dataset/proof/tabel"

export function getDatasetProofTabel(
    datasetProofs: DatasetProofType[]
): IDatasetProofTabel[] {
    const result: IDatasetProofTabel[] = []

    datasetProofs.forEach((datasetProof, index) => {
        result[index] = {
            key: datasetProof.hash,
            hash: datasetProof.hash,
            cid: datasetProof.cid,
            size: datasetProof.size,
        }
    })

    return result
}
