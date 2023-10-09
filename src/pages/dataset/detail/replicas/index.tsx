import React, { useEffect, useState } from "react"
import { Descriptions } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import {
    DatasetOverviewType,
    DatasetReplicasType,
} from "@dataswapjs/dataswap-sdk"
import DatasetReplicasTabel from "@/components//tabel/dataset/replica"
import { DatasetReplicasDescription } from "@/components/description/dataset/replica"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [replicasList, setReplicasList] = useState<DatasetReplicasType[]>()
    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()
    const router = useRouter()
    const { da } = router.query as { id: string; da: string }

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)

                const dataArray = Object.values(res.data.replicasDetail)
                const newReplicasArray: DatasetReplicasType[] = dataArray.map(
                    (item: any) => {
                        let state = ""
                        let operate = ""
                        if (
                            res.data.state === "Approved" &&
                            item.state === ""
                        ) {
                            state = "Approved"
                            operate = "matching"
                        }
                        return {
                            ...item,
                            state: state,
                            operate: operate,
                        }
                    }
                )
                res.data.replicasCountries
                    ? setReplicasList(newReplicasArray)
                    : setReplicasList([])
            })
    }, [])

    if (id !== 0) {
        return (
            <>
                {datasetOverview && (
                    <DatasetReplicasDescription data={datasetOverview} />
                )}
                {replicasList && (
                    <DatasetReplicasTabel data={replicasList} datasetId={id} />
                )}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
