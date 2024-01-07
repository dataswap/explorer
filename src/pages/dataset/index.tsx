import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import DatasetTabel from "@/components/table/dataset"
import { getDatasetMetadata } from "../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    const [datasetMetaList, setDatasetMetaList] =
        useState<ValueFields<DatasetMetadata>[]>()
    const router = useRouter()

    useEffect(() => {
        getDatasetMetadata({ network: "calibration" }).then((res) => {
            const datasetOveriew = res.data
            setDatasetMetaList(datasetOveriew)
        })
    }, [])

    const onClick = () => {
        router.push("/dataset/submit/dataset")
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h4>Dataset List</h4>
                <div style={{ marginLeft: "auto" }}>
                    <Button type="text" htmlType="button" onClick={onClick}>
                        <PlusOutlined style={{ color: "black" }} />
                        Create Dataset
                    </Button>
                </div>
            </div>

            {datasetMetaList && <DatasetTabel data={datasetMetaList} />}
        </>
    )
}
