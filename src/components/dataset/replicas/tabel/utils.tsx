import { DatasetReplicasType } from "@/types/dataset"
import { IDatasetReplicasTabel } from "@/components/dataset/replicas/tabel"
import Link from "next/link"

export function getDatasetReplicasTabel(
    datasetProofs: DatasetReplicasType[],
    datasetId: number
): IDatasetReplicasTabel[] {
    const result: IDatasetReplicasTabel[] = []

    datasetProofs &&
        datasetProofs.forEach((datasetProof, index) => {
            result[index] = {
                key: datasetProof.id,
                id: datasetProof.id,
                country: datasetProof.country,
                dp: datasetProof.dp,
                state: datasetProof.state,
                operate: (
                    <Link
                        href={`/matching/submit/${datasetProof.operate}?datasetId=${datasetId}&replicaId=${datasetProof.id} `}
                    >
                        {datasetProof.operate}
                    </Link>
                ),
            }
        })

    return result
}
