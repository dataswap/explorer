import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { MessageDescription } from "@/components/description/message"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import { getDataswapMessage } from "../../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [datasetMetadata, setDatasetMetadata] =
        useState<ValueFields<DataswapMessage>>()

    useEffect(() => {
        if (id) {
            getDataswapMessage({
                network: "calibration",
                queryFilter: { conditions: [{ cid: { "/": id } }] },
            }).then((res) => {
                const datasetMetadata = res.data
                //TODO
                setDatasetMetadata(datasetMetadata![0])
            })
        }
    }, [id])

    return (
        <>{datasetMetadata && <MessageDescription data={datasetMetadata} />}</>
    )
}
