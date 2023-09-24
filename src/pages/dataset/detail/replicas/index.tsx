import React, { useEffect, useState } from "react"
import type { DescriptionsProps } from "antd"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import { DatasetOverviewType, DatasetReplicasType } from "@/types/dataset"
import DatasetReplicasTabel, {
    IDatasetReplicasTabel,
} from "@/components/dataset/replicas/tabel"
import { getDatasetReplicasTabel } from "@/components/dataset/replicas/tabel/utils"
import { getDatasetReplicasDescriptionItems } from "@/components/dataset/utils"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [replicasList, setReplicasList] = useState<IDatasetReplicasTabel[]>()
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
                    ? setReplicasList(
                          getDatasetReplicasTabel(newReplicasArray, id)
                      )
                    : setReplicasList([])
            })
    }, [])

    if (id !== 0) {
        return (
            <>
                {datasetOverview && (
                    <Descriptions
                        title=""
                        items={getDatasetReplicasDescriptionItems(
                            datasetOverview
                        )}
                    />
                )}
                {replicasList && <DatasetReplicasTabel data={replicasList} />}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
