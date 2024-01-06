import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import { Button } from "antd"
import axios from "axios"
import { PlusOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import DatasetTabel from "@/components/table/dataset"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    const [datasetList, setDatasetList] = useState<DatasetMetadata[]>()
    const [closeAction, setCloseAction] = useState<boolean>()
    const router = useRouter()

    useEffect(() => {
        axios("http://localhost:3001/datasetInfo").then((res) => {
            const datasetOveriew: DatasetMetadata[] = res.data
            setDatasetList(datasetOveriew)
        })
    }, [closeAction])

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

            {datasetList && <DatasetTabel data={datasetList} />}
        </>
    )
}
