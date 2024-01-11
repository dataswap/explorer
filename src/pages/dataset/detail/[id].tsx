import { useEffect, useState } from "react"
import { Tabs } from "antd"
import { useRouter } from "next/router"
import { DatasetMetadataDescription } from "@/components/description/dataset"
import { DatasetRequirementDescription } from "@/components/description/dataset/requirement"
import { DatasetProofDescription } from "@/components/description/dataset/proofMetadata"
import CarTable from "../../basic/tabel/car"
import MessageTable from "../../basic/tabel/message"
import DatasetRequirementBasicTable from "../../basic/tabel/datasetRequirement"
import {
    DatasetMetadata,
    DatasetRequirement,
    DatasetProofMetadata,
} from "@dataswapjs/dataswapjs"
import { convertDataToItems } from "@unipackage/webkit"
import {
    getDatasetMetadata,
    getDatasetProofMetadata,
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
                    car: (
                        <CarTable
                            queryParam={{
                                network: "calibration",
                                queryFilter: {
                                    ...defaultTableQueryParams,
                                    conditions: [{ datasetId: id }],
                                    sort: [{ field: "carId", order: "desc" }],
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
            {datasetProofMeta && (
                <DatasetProofDescription data={datasetProofMeta} />
            )}

            <Tabs
                defaultActiveKey="Proof"
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
