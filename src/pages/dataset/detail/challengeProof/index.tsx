import React, { useEffect, useState } from "react"
import { Descriptions } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import {
    DatasetOverviewType,
    DatasetChallengeProofType,
} from "@dataswapjs/dataswap-sdk"
import DatasetChallengeTabel from "@/components/tabel/dataset/challenge"
import { DatasetChallengeDescription } from "@/components/description/dataset/challenge"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [challengeList, setChallengeList] =
        useState<DatasetChallengeProofType[]>()

    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()
    const [complete, setComplete] = useState<boolean>()
    const router = useRouter()

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)
                setComplete(res.data.proofChallengeCompleted)
                const newChallengesArray =
                    res.data.proofChallenge &&
                    (Object.values(
                        res.data.proofChallenge
                    ) as DatasetChallengeProofType[])

                newChallengesArray
                    ? setChallengeList(newChallengesArray)
                    : setChallengeList([])
            })
    }, [])

    if (id !== 0) {
        return (
            <>
                {datasetOverview && (
                    <DatasetChallengeDescription data={datasetOverview} />
                )}
                {challengeList && datasetOverview && (
                    <DatasetChallengeTabel
                        data={challengeList}
                        overview={datasetOverview}
                    />
                )}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
