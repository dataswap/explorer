import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ValueFields } from "@unipackage/utils"
import { useSelector } from "react-redux"
import { DatasetChallengeDescription } from "@/components/description/dataset/challenge"
import { DatasetChallenge } from "@dataswapjs/dataswapjs"
import { getDatasetChallenges } from "../../../../messagehub/get"

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState<ValueFields<DatasetChallenge>>()
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )

    useEffect(() => {
        if (id) {
            getDatasetChallenges({
                network,
                queryFilter: { conditions: [{ randomSeed: id }] },
            }).then((res) => {
                const result = res.data
                setData(result![0])
            })
        }
    }, [id])

    return <>{data && <DatasetChallengeDescription data={data} />}</>
}
