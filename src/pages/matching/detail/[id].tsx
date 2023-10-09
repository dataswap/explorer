import { Tabs } from "antd"
import type { TabsProps } from "antd"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import BidDetail from "@/pages/matching/detail/bid"
import { useRouter } from "next/router"
import { MatchingDetailDescription } from "@/components/description/matching"
import { MatchingWinnerDescription } from "@/components/description/matching/winner"
import { MatchingOverviewType } from "@dataswapjs/dataswap-sdk"
import { useEffect, useState } from "react"
import axios from "axios"

const onChange = (key: string) => {
    console.log(key)
}

function getItems(id: number): TabsProps["items"] {
    return [
        {
            key: "Bids",
            label: "Bids",
            children: <BidDetail id={id} />,
        },
    ]
}
export default () => {
    const router = useRouter()
    const { id } = router.query
    const [overview, setOverview] = useState<MatchingOverviewType>()

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/matchingsInfo/${id}`).then((res) => {
                setOverview(res.data)
            })
    }, [])

    return (
        <>
            {overview && (
                <>
                    <MatchingDetailDescription data={overview} />
                    <MatchingWinnerDescription data={overview} />
                </>
            )}
            <Tabs
                defaultActiveKey="Bids"
                items={getItems(Number(id))}
                onChange={onChange}
            />
        </>
    )
}
