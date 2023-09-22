import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import axios from "axios"
import DatasetOverviewTabel, {
    IDatasetOverviewTabel,
} from "@/components/dataset/overview/tabel"
import { getDatasetOverviewTabel } from "@/components/dataset/overview/tabel/utils"
import { DatasetOverviewType } from "@/types/dataset"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    const [datasetList, setDatasetList] = useState<IDatasetOverviewTabel[]>()
    useEffect(() => {
        axios("http://localhost:3001/datasetInfo").then((res) => {
            const datasetOveriew: DatasetOverviewType[] = res.data
            setDatasetList(getDatasetOverviewTabel(datasetOveriew))
        })
    }, [])
    return <>{datasetList && <DatasetOverviewTabel data={datasetList} />}</>
}
