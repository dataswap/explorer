import { Tabs } from "antd"
import BidDetail from "@/pages/matching/detail/bid"
import { useRouter } from "next/router"
import { MatchingDetailDescription } from "@/components/description/matching"
import { MatchingWinnerDescription } from "@/components/description/matching/winner"
import { MatchingOverviewType } from "@dataswapjs/dataswap-sdk"
import { useEffect, useState } from "react"
import axios from "axios"
import { convertDataToItems } from "@dataswapjs/webutils"

const onChange = (key: string) => {
    console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [overview, setOverview] = useState<MatchingOverviewType>()

    const tabItems = convertDataToItems({
        bids: <BidDetail id={Number(id)} />,
    })

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
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
