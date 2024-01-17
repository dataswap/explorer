import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ValueFields } from "@unipackage/utils"
import { DatasetProofMetadataDescription } from "@/components/description/dataset/proofMetadata"
import { DatasetProofMetadata } from "@dataswapjs/dataswapjs"
import { getDatasetProofMetadata } from "../../../../shared/messagehub/get"

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState<ValueFields<DatasetProofMetadata>>()

    useEffect(() => {
        if (id) {
            getDatasetProofMetadata({
                network: "calibration",
                queryFilter: { conditions: [{ rootHash: id }] },
            }).then((res) => {
                const result = res.data
                setData(result![0])
            })
        }
    }, [id])

    return <>{data && <DatasetProofMetadataDescription data={data} />}</>
}
