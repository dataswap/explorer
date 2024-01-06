import { useEffect, useState } from "react"
import axios from "axios"
import { Tabs } from "antd"
import { useRouter } from "next/router"
import { DatasetMetadataDescription } from "@/components/description/dataset"
import { DatasetRequirementDescription } from "@/components/description/dataset/requirement"
import { DatasetProofDescription } from "@/components/description/dataset/proofMetadata"
import DatasetRequirementTable from "@/components/table/dataset/requirement"
import CarPage from "../../car"
import MessagePage from "../../message"
import {
    DatasetMetadata,
    DatasetRequirement,
    DatasetProofMetadata,
} from "@dataswapjs/dataswapjs"
import { convertDataToItems } from "@unipackage/webkit"

const onChange = (key: string) => {
    console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [datasetOverview, setDatasetOverview] = useState<DatasetMetadata>()

    const tabItems = convertDataToItems({
        messasge: <MessagePage />,
        car: <CarPage />,
        requirement: <DatasetRequirementTable data={[]} />,
    })

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)
            })
    }, [])

    return (
        <>
            {datasetOverview && (
                <DatasetMetadataDescription data={datasetOverview} />
            )}
            <Tabs
                defaultActiveKey="Proof"
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
