import { useEffect, useState } from "react"
import { Tabs } from "antd"
import { useRouter } from "next/router"
import { DatasetMetadataDescription } from "@/components/description/dataset"
import { ReplicasCountDescription } from "@/components/description/dataset/replicasCount"
import DatasetProofMetadataTable from "../../basic/table/datasetProofMetadata"
import CarTable from "../../basic/table/car"
import MessageTable from "../../basic/table/message"
import DatasetRequirementBasicTable from "../../basic/table/datasetRequirement"
import { DatasetMetadata, DatasetProofMetadata } from "@dataswapjs/dataswapjs"
import { convertDataToItems } from "@unipackage/webkit"
import {
    getDatasetMetadata,
    getDatasetProofMetadata,
    getDatasetRequirementCount,
} from "../../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"
import { defaultTableQueryParams } from "../../../config/params"

const onChange = (key: string) => {
    console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [datasetMetadata, setDatasetMetadata] =
        useState<ValueFields<DatasetMetadata>>()
    const [datasetProofMeta, setDatasetProofMeta] =
        useState<ValueFields<DatasetProofMetadata>>()
    const [replicasCount, setReplicasCount] = useState<number>()
    const [tabItems, setTabItems] = useState<any>()

    useEffect(() => {
        if (id) {
            getDatasetMetadata({
                network: "calibration",
                queryFilter: { conditions: [{ datasetId: id }] },
            }).then((res) => {
                const datasetMetadata = res.data
                //TODO
                setDatasetMetadata(datasetMetadata![0])
            })

            getDatasetProofMetadata({
                network: "calibration",
                queryFilter: { conditions: [{ datasetId: id }] },
            }).then((res) => {
                const datasetMetadata = res.data
                //TODO
                setDatasetProofMeta(datasetMetadata![0])
            })

            getDatasetRequirementCount({
                network: "calibration",
                queryFilter: { conditions: [{ datasetId: id }] },
            }).then((res) => {
                const datasetMetadata = res.data
                setReplicasCount(datasetMetadata)
            })

            setTabItems(
                convertDataToItems({
                    messasge: (
                        <MessageTable
                            queryParam={{
                                network: "calibration",
                                queryFilter: {
                                    ...defaultTableQueryParams,
                                    conditions: [{ datasetId: id }],
                                    sort: [{ field: "height", order: "desc" }],
                                },
                            }}
                        />
                    ),
                    replicaRequirement: (
                        <DatasetRequirementBasicTable
                            queryParam={{
                                network: "calibration",
                                queryFilter: {
                                    ...defaultTableQueryParams,
                                    conditions: [{ datasetId: id }],
                                    sort: [{ field: "index", order: "asc" }],
                                },
                            }}
                        />
                    ),
                    proofMetadata: (
                        <DatasetProofMetadataTable
                            queryParam={{
                                network: "calibration",
                                queryFilter: {
                                    ...defaultTableQueryParams,
                                    conditions: [{ datasetId: id }],
                                    sort: [{ field: "dataType", order: "asc" }],
                                },
                            }}
                        />
                    ),
                    car: (
                        <CarTable
                            queryParam={{
                                network: "calibration",
                                queryFilter: {
                                    ...defaultTableQueryParams,
                                    conditions: [{ datasetId: id }],
                                    sort: [{ field: "carId", order: "asc" }],
                                },
                            }}
                        />
                    ),
                })
            )
        }
    }, [id])

    return (
        <>
            {datasetMetadata && (
                <DatasetMetadataDescription data={datasetMetadata} />
            )}
            <ReplicasCountDescription
                data={replicasCount ? replicasCount : 0}
            />

            <Tabs
                defaultActiveKey="Proof"
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
