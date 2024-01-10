import React from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import DatasetBasicTable from "../basic/tabel/dataset"
import { defaultTableQueryParams } from "../../config/params"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    const router = useRouter()

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
            {
                <DatasetBasicTable
                    queryParam={{
                        network: "calibration",
                        queryFilter: {
                            ...defaultTableQueryParams,
                        },
                    }}
                />
            }
        </>
    )
}
