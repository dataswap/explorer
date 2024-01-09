import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { DatasetRequirement } from "@dataswapjs/dataswapjs"
import DatasetRequirementTabel from "@/components//table/dataset/requirement"
// import { DatasetReplicasDescription } from "@/components/description/dataset/replica"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [replicasList, setReplicasList] = useState<DatasetRequirement[]>()
    const [datasetOverview, setDatasetOverview] = useState<DatasetRequirement>()
    const router = useRouter()
    const { da } = router.query as { id: string; da: string }

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)

                const dataArray = Object.values(res.data.replicasDetail)
                const newReplicasArray: DatasetRequirement[] = dataArray.map(
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
                {/* {datasetOverview && (
                    <DatasetReplicasDescription data={datasetOverview} />
                )} */}
                {replicasList && (
                    //@ts-ignore
                    <DatasetRequirementTabel data={replicasList} />
                )}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
