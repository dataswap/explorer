import React, { useEffect, useState } from "react"
import type { DescriptionsProps } from "antd"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import { DatasetOverviewType, DatasetChallengeProofType } from "@/types/dataset"
import DatasetChallengeTabel, {
    IDatasetChallengeProofTabel,
} from "@/components/dataset/challenge/tabel"
import { getDatasetProofChallengeTabel } from "@/components/dataset/challenge/tabel/utils"
import { getDatasetChallengeDescriptionItems } from "@/components/dataset/utils"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [challengeList, setChallengeList] =
        useState<IDatasetChallengeProofTabel[]>()

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
                    ? setChallengeList(
                          getDatasetProofChallengeTabel(
                              newChallengesArray,
                              res.data,
                              Number(id)
                          )
                      )
                    : setChallengeList([])
            })
    }, [])

    if (id !== 0) {
        return (
            <>
                {datasetOverview && (
                    <Descriptions
                        title=""
                        items={getDatasetChallengeDescriptionItems(
                            datasetOverview
                        )}
                    />
                )}
                {challengeList && (
                    <DatasetChallengeTabel data={challengeList} />
                )}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
