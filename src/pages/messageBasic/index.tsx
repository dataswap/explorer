import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import { useRouter } from "next/router"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import MessageTabel from "@/components/table/message"
import { getDataswapMessage } from "../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"
import { QueryParam } from "@/shared/messagehub/queryParams"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}
interface IProps {
    data: QueryParam<DataswapMessage>
}

export default ({ data }: IProps) => {
    const [datasetMetaList, setDatasetMetaList] =
        useState<ValueFields<DataswapMessage>[]>()

    useEffect(() => {
        getDataswapMessage(data).then((res) => {
            const datasetOveriew = res.data
            setDatasetMetaList(datasetOveriew)
        })
    }, [])

    return <>{datasetMetaList && <MessageTabel data={datasetMetaList} />}</>
}
