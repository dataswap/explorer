import React, { useEffect, useState } from "react"
import type { DescriptionsProps } from "antd"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import { DatasetOverviewType, DatasetDisputeType } from "@/types/dataset"
import DatasetDisputeTabel, {
    IDatasetDisputeTabel,
} from "@/components/dataset/dispute/tabel"
import { getDatasetDisputeChallengeTabel } from "@/components/dataset/dispute/tabel/utils"
import { getDatasetDisputeDescriptionItems } from "@/components/dataset/utils"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [disputeList, setDisputeList] = useState<IDatasetDisputeTabel[]>()
    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()
    const router = useRouter()
    const [dispute, setDispute] = useState<DatasetDisputeType>()
    const { da } = router.query as { id: string; da: string }

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)

                const newDisputesArray =
                    res.data.disputes &&
                    (Object.values(res.data.disputes) as DatasetDisputeType[])
                newDisputesArray
                    ? setDisputeList(
                          getDatasetDisputeChallengeTabel(newDisputesArray)
                      )
                    : setDisputeList([])
            })
    }, [dispute])

    if (id !== 0) {
        return (
            <>
                {datasetOverview && (
                    <Descriptions
                        title=""
                        items={getDatasetDisputeDescriptionItems(
                            datasetOverview
                        )}
                    />
                )}
                {disputeList && <DatasetDisputeTabel data={disputeList} />}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
