import { useEffect, useState } from "react"
import axios from "axios"
import { Tabs } from "antd"
import ChallengeDetail from "@/pages/dataset/detail/challengeProof"
import ProofDetail from "@/pages/dataset/detail/proof"
import DisputeDetail from "@/pages/dataset/detail/dispute"
import ReplicasDetail from "@/pages/dataset/detail/replicas"
import { useRouter } from "next/router"
import { DatasetDetailDescription } from "@/components/description/dataset"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import { convertDataToItems } from "@dataswapjs/webutils"

const onChange = (key: string) => {
    console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()

    const tabItems = convertDataToItems({
        proof: <ProofDetail id={Number(id)} />,
        challenge: <ChallengeDetail id={Number(id)} />,
        dispute: <DisputeDetail id={Number(id)} />,
        replicas: <ReplicasDetail id={Number(id)} />,
    })

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)
            })
    }, [])

    return (
        <>
            {datasetOverview && (
                <DatasetDetailDescription data={datasetOverview} />
            )}
            <Tabs
                defaultActiveKey="Proof"
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
