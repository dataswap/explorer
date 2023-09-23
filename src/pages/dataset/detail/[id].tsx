import { Tabs } from "antd"
import type { TabsProps } from "antd"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import ChallengeDetail from "@/pages/dataset/detail/challengeProof"
import ProofDetail from "@/pages/dataset/detail/proof"
import DisputeDetail from "@/pages/dataset/detail/dispute"
import { useRouter } from "next/router"
import {
    getDatasetDetailDescriptionItems,
    getDatasetProofDescriptionItems,
} from "@/components/dataset/utils"
import { DatasetOverviewType, DatasetChallengeProofType } from "@/types/dataset"
import { useEffect, useState } from "react"
import axios from "axios"

const onChange = (key: string) => {
    console.log(key)
}

function getItems(id: number): TabsProps["items"] {
    return [
        {
            key: "Proof",
            label: "Proof",
            children: <ProofDetail id={id} />,
        },
        {
            key: "Challenge",
            label: "Challenge",
            children: <ChallengeDetail id={id} />,
        },
        {
            key: "Dispute",
            label: "Dispute",
            children: <DisputeDetail id={id} />,
        },
    ]
}
export default () => {
    const router = useRouter()
    const { id } = router.query
    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)
            })
    }, [])

    return (
        <>
            {datasetOverview && (
                <Descriptions
                    title="Dataset Info"
                    items={getDatasetDetailDescriptionItems(datasetOverview)}
                />
            )}
            <Tabs
                defaultActiveKey="Proof"
                items={getItems(Number(id))}
                onChange={onChange}
            />
        </>
    )
}
