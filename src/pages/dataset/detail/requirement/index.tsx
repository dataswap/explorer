import { useEffect, useState } from "react"
import { ValueFields } from "@unipackage/utils"
import { useRouter } from "next/router"
import { DatasetRequirementDescription } from "@/components/description/dataset/requirement"
import { DatasetRequirement } from "@dataswapjs/dataswapjs"
import { getDatasetRequirement } from "../../../../messagehub/get"
import { useSelector } from "react-redux"

export default function index() {
    const [data, setData] = useState<ValueFields<DatasetRequirement>>()
    const router = useRouter()
    const { datasetid, index } = router.query
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )

    useEffect(() => {
        if (datasetid) {
            getDatasetRequirement({
                network,
                queryFilter: {
                    and: [
                        { conditions: [{ datasetId: Number(datasetid) }] },
                        { conditions: [{ index: Number(index) }] },
                    ],
                },
            }).then((res) => {
                const result = res.data
                setData(result![0])
            })
        }
    }, [datasetid, index])

    return <>{data && <DatasetRequirementDescription data={data} />}</>
}
