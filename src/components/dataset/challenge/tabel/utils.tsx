import { DatasetChallengeProofType } from "@/types/dataset"
import { IDatasetChallengeProofTabel } from "@/components/dataset/challenge/tabel"
import Link from "next/link"

export function getDatasetProofChallengeTabel(
    datasetProofs: DatasetChallengeProofType[]
): IDatasetChallengeProofTabel[] {
    const result: IDatasetChallengeProofTabel[] = []

    datasetProofs.forEach((datasetProof, index) => {
        result[index] = {
            key: datasetProof.da,
            da: datasetProof.da,
            challenge: datasetProof.challenge,
            operate: (
                <Link
                    href={`/dataset/submit/${datasetProof.operate}/${datasetProof.da}`}
                >
                    submit {datasetProof.operate}
                </Link>
            ),
        }
    })

    return result
}
