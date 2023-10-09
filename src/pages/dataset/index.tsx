import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import { Button } from "antd"
import axios from "axios"
import { PlusOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import DatasetOverviewTabel from "@/components/tabel/dataset/overview"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    const [datasetList, setDatasetList] = useState<DatasetOverviewType[]>()
    const [closeAction, setCloseAction] = useState<boolean>()
    const router = useRouter()

    const handleClose = (id: number) => {
        axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
            const overview: any = res.data
            const fail =
                overview.disputes &&
                Object.values(overview.disputes).some(
                    (dispute: any) => dispute.result === "valid"
                )
            console.log(fail)
            if (fail) {
                axios
                    .patch(`http://localhost:3001/datasetInfo/${id}`, {
                        state: "Reject",
                        operate: "",
                    })
                    .then((res) => {
                        setCloseAction(!closeAction)
                    })
            } else {
                axios
                    .patch(`http://localhost:3001/datasetInfo/${id}`, {
                        state: "Approved",
                        operate: "",
                    })
                    .then((res) => {
                        setCloseAction(!closeAction)
                    })
            }
        })
    }
    useEffect(() => {
        axios("http://localhost:3001/datasetInfo").then((res) => {
            const datasetOveriew: DatasetOverviewType[] = res.data
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

            {datasetList && (
                <DatasetOverviewTabel
                    data={datasetList}
                    handleClose={handleClose}
                />
            )}
        </>
    )
}
