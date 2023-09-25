import { DatasetOverviewType, DatasetChallengeProofType } from "@/types/dataset"
import { IDatasetChallengeProofTabel } from "@/components/dataset/challenge/tabel"
import Link from "next/link"

export function getDatasetProofChallengeTabel(
    datasetProofs: DatasetChallengeProofType[],
    overview: DatasetOverviewType,
    id: number
): IDatasetChallengeProofTabel[] {
    const result: IDatasetChallengeProofTabel[] = []

    datasetProofs &&
        datasetProofs.forEach((datasetProof, index) => {
            result[index] = {
                key: datasetProof.da,
                da: datasetProof.da,
                challenge: datasetProof.challenge,
                operate: overview.state !== "Approved" &&
                    overview.state !== "Reject" && (
                        <Link
                            href={`/dataset/submit/${datasetProof.operate}/${id}?da=${datasetProof.da}`}
                        >
                            submit {datasetProof.operate}
                        </Link>
                    ),
            }
        })

    return result
}
