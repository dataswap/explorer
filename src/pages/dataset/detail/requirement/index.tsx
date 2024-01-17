import { useEffect, useState } from "react"
import { ValueFields } from "@unipackage/utils"
import { useRouter } from "next/router"
import { DatasetRequirementDescription } from "@/components/description/dataset/requirement"
import { DatasetRequirement } from "@dataswapjs/dataswapjs"
import { getDatasetRequirement } from "../../../../shared/messagehub/get"

export default function index() {
    const [data, setData] = useState<ValueFields<DatasetRequirement>>()
    const router = useRouter()
    const { datasetid, index } = router.query

    useEffect(() => {
        if (datasetid) {
            getDatasetRequirement({
                network: "calibration",
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
