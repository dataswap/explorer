import React from "react"
import { Button } from "antd"
import {
    Tabel,
    generateTabelColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { MatchingOverviewType } from "@dataswapjs/dataswapjs"
import Link from "next/link"

interface MatchingOverviewTabelItem {
    key: React.ReactNode
    id: React.ReactNode
    datasetId: React.ReactNode
    replicaId: string
    createdTime: string
    submitter: string
    size: string
    initialPrice: number
    state: string
    operate: React.ReactNode
}

interface IProps {
    data: MatchingOverviewType[]
    handleClose: (id: number) => void
}

export default ({ data, handleClose }: IProps) => {
    const columns = generateTabelColumns<MatchingOverviewTabelItem>({
        id: "7.5%",
        datasetId: "10%",
        replicaId: "7.5%",
        createdTime: "15%",
        submitter: "15%",
        size: "7.5%",
        initialPrice: "7.5%",
        state: "15%",
        operate: "15%",
    })

    const tabelItems: MatchingOverviewTabelItem[] = convertDataToTableItems<
        MatchingOverviewType,
        MatchingOverviewTabelItem
    >(data, (item) => ({
        key: item.id,
        ...item,
        id: <Link href={`/matching/detail/${item.id}`}>{item.id}</Link>,
        datasetId: (
            <Link href={`/dataset/detail/${item.datasetId}`}>
                {item.datasetId}
            </Link>
        ),
        operate: (
            <>
                <Link href={`/matching/submit/${item.operate}/${item.id}`}>
                    {item.operate}
                </Link>
                {item.state !== "Complete" && item.state !== "Failed" && (
                    <Button
                        type="text"
                        htmlType="button"
                        onClick={() => handleClose(item.id)}
                    >
                        {/* <CloseCircleOutlined style={{ color: "blue" }} /> */}
                        <span style={{ color: "blue" }}>Close</span>
                    </Button>
                )}
            </>
        ),
    }))

    return (
        <Tabel<MatchingOverviewTabelItem> columns={columns} data={tabelItems} />
    )
}
