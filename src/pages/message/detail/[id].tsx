import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { MessageDescription } from "@/components/description/message"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import { getDataswapMessage } from "../../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"
import { useSelector } from "react-redux"

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [datasetMetadata, setDatasetMetadata] =
        useState<ValueFields<DataswapMessage>>()
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )

    useEffect(() => {
        if (id) {
            getDataswapMessage({
                network,
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
