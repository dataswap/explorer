import React from "react"
import { Button } from "antd"
import {
    Tabel,
    generateTabelColumns,
    convertDataToTableItems,
} from "@dataswapjs/webutils"
import { DatasetOverviewType } from "@dataswapjs/dataswap-sdk"
import Link from "next/link"

interface DatasetOverviewTabelItem {
    key: React.ReactNode
    id: React.ReactNode
    name: React.ReactNode
    createdHeight: string
    createdTime: string
    size: string
    submitter: string
    state: string
    operate: React.ReactNode
}

interface IProps {
    data: DatasetOverviewType[]
    handleClose: (id: number) => void
}

export default ({ data, handleClose }: IProps) => {
    const columns = generateTabelColumns<DatasetOverviewTabelItem>({
        id: "7%",
        name: "15%",
        size: "8%",
        createdHeight: "15%",
        createdTime: "15%",
        submitter: "10%",
        state: "15%",
        operate: "15%",
    })

    const tabelItems: DatasetOverviewTabelItem[] = convertDataToTableItems<
        DatasetOverviewType,
        DatasetOverviewTabelItem
    >(data, (item) => ({
        key: item.id,
        ...item,
        id: <Link href={`/dataset/detail/${item.id}`}>{item.id}</Link>,
        name: <Link href={`/dataset/detail/${item.id}`}>{item.name}</Link>,
        operate: (
            <>
                <Link href={`/dataset/submit/${item.operate}/${item.id}`}>
                    {item.operate}
                </Link>
                {item.state === "DisputeInitiationPeriod" && (
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
        <Tabel<DatasetOverviewTabelItem> columns={columns} data={tabelItems} />
    )
}
