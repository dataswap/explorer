import { useEffect, useState } from "react"
import { Tabs } from "antd"
import { useRouter } from "next/router"
import { DatasetMetadataDescription } from "@/components/description/dataset"
import { ReplicasCountDescription } from "@/components/description/dataset/replicasCount"
import DatasetProofMetadataTable from "../../../components/table/service/datasetProofMetadata"
import DatasetChallengeTable from "../../../components/table/service/challenge"
import CarTable from "../../../components/table/service/car"
import MessageTable from "../../../components/table/service/message"
import DatasetRequirementTable from "../../../components/table/service/datasetRequirement"
import {
    DatasetMetadata,
    // DatasetProofMetadata
} from "@dataswapjs/dataswapjs"
import { convertDataToItems } from "@unipackage/webkit"
import {
    getDatasetMetadata,
    // getDatasetProofMetadata,
    getDatasetRequirementCount,
} from "../../../messagehub/get"
import { ValueFields } from "@unipackage/utils"
import { defaultTableQueryParams } from "../../../config/params"
import { useSelector } from "react-redux"

const onChange = (key: string) => {
    // console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [datasetMetadata, setDatasetMetadata] =
        useState<ValueFields<DatasetMetadata>>()
    // const [datasetProofMeta, setDatasetProofMeta] =
    //     useState<ValueFields<DatasetProofMetadata>>()
    const [replicasCount, setReplicasCount] = useState<number>()
    const [tabItems, setTabItems] = useState<any>()
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )

    useEffect(() => {
        if (id) {
            getDatasetMetadata({
                network,
                queryFilter: { conditions: [{ datasetId: id }] },
            }).then((res) => {
                const result = res.data
                //TODO
                setDatasetMetadata(result![0])
            })

            /*
            getDatasetProofMetadata({
                network,
                queryFilter: { conditions: [{ datasetId: id }] },
            }).then((res) => {
                const result = res.data
                setDatasetProofMeta(result![0])
            })
            */

            getDatasetRequirementCount({
                network,
                queryFilter: { conditions: [{ datasetId: id }] },
            }).then((res) => {
                const result = res.data
                setReplicasCount(result)
            })

            setTabItems(
                convertDataToItems({
                    messasge: (
                        <MessageTable
                            queryParam={{
                                network,
                                queryFilter: {
                                    ...defaultTableQueryParams,
                                    conditions: [{ datasetId: id }],
                                    sort: [{ field: "height", order: "desc" }],
                                },
                            }}
                        />
                    ),
                    replicaRequirement: (
                        <DatasetRequirementTable
                            queryParam={{
                                network,
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
                                network,
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
                                network,
                                queryFilter: {
                                    ...defaultTableQueryParams,
                                    conditions: [{ datasetId: id }],
                                    sort: [{ field: "carId", order: "asc" }],
                                },
                            }}
                        />
                    ),
                    challenge: (
                        <DatasetChallengeTable
                            queryParam={{
                                network,
                                queryFilter: {
                                    ...defaultTableQueryParams,
                                    conditions: [{ datasetId: id }],
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
                defaultActiveKey="messasge"
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
