import { useEffect, useState } from "react"
import { Tabs } from "antd"
import { useRouter } from "next/router"
import { DatasetMetadataDescription } from "@/components/description/dataset"
import { DatasetRequirementDescription } from "@/components/description/dataset/requirement"
import { DatasetProofDescription } from "@/components/description/dataset/proofMetadata"
import DatasetRequirementTable from "@/components/table/dataset/requirement"
import CarPage from "../../basic/car"
import MessageBasicPage from "../../basic/message"
import {
    DatasetMetadata,
    DatasetRequirement,
    DatasetProofMetadata,
} from "@dataswapjs/dataswapjs"
import { convertDataToItems } from "@unipackage/webkit"
import { getDatasetMetadata } from "../../../shared/messagehub/get"
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

    const tabItems = convertDataToItems({
        messasge: (
            <MessageBasicPage
                queryParam={{
                    network: "calibration",
                    queryFilter: {
                        ...defaultTableQueryParams,
                        conditions: [{ datasetId: id }],
                    },
                }}
            />
        ),
        car: <CarPage />,
        requirement: <DatasetRequirementTable data={[]} />,
    })

    useEffect(() => {
        getDatasetMetadata({
            network: "calibration",
            queryFilter: { conditions: [{ datasetId: id }] },
        }).then((res) => {
            const datasetMetadata = res.data
            //TODO
            setDatasetMetadata(datasetMetadata![0])
        })
    }, [])

    return (
        <>
            {datasetMetadata && (
                <DatasetMetadataDescription data={datasetMetadata} />
            )}
            <Tabs
                defaultActiveKey="Proof"
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
