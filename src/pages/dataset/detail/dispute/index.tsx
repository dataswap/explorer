import React, { useEffect, useState } from "react"
import { Descriptions } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import { DatasetOverviewType, DatasetDisputeType } from "@dataswapjs/dataswapjs"
import DatasetDisputeTabel from "@/components/tabel/dataset/dispute"
import { DatasetDisputeDescription } from "@/components/description/dataset/dispute"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [disputeList, setDisputeList] = useState<DatasetDisputeType[]>()
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
                    ? setDisputeList(newDisputesArray)
                    : setDisputeList([])
            })
    }, [dispute])

    if (id !== 0) {
        return (
            <>
                {datasetOverview && (
                    <DatasetDisputeDescription data={datasetOverview} />
                )}
                {disputeList && <DatasetDisputeTabel data={disputeList} />}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
