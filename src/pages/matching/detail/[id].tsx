import { Tabs } from "antd"
import { useRouter } from "next/router"
import { MatchingMetadataDescription } from "@/components/description/matching"
import { MatchingTargetDescription } from "@/components/description/matching/target"
import { MatchingWinnerDescription } from "@/components/description/matching/winner"
import { MatchingMetadata, MatchingTarget } from "@dataswapjs/dataswapjs"
import { useEffect, useState } from "react"
import axios from "axios"
import { convertDataToItems } from "@unipackage/webkit"
import { MatchingBid } from "@/shared/types"
import CarReplicaPage from "../../basic/tabel/carReplica"
import MessageBasicPage from "../../basic/tabel/message"

const onChange = (key: string) => {
    console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [overview, setOverview] = useState<MatchingMetadata>()

    const tabItems = convertDataToItems({
        messasge: (
            <MessageBasicPage
                queryParam={{
                    network: "calibration",
                    queryFilter: { conditions: [{ matchingId: id }] },
                }}
            />
        ),
        car: <CarReplicaPage />,
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
                    <MatchingMetadataDescription data={overview} />
                    <MatchingTargetDescription data={{} as MatchingTarget} />
                    <MatchingWinnerDescription data={{} as MatchingBid} />
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
