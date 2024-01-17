import { Tabs } from "antd"
import { useRouter } from "next/router"
import { MatchingMetadataDescription } from "@/components/description/matching"
import { MatchingTargetDescription } from "@/components/description/matching/target"
import { MatchingWinnerDescription } from "@/components/description/matching/winner"
import {
    MatchingMetadata,
    MatchingTarget,
    MatchingBid,
} from "@dataswapjs/dataswapjs"
import { useEffect, useState } from "react"
import { convertDataToItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import CarReplicaPage from "../../basic/table/carReplica"
import MessageBasicPage from "../../basic/table/message"
import MatchingBidBasicPage from "../../basic/table/matchingBid"
import { getMatchingMetadata, getMatchingTarget } from "@/shared/messagehub/get"
import { useSelector } from "react-redux"

const onChange = (key: string) => {
    console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [overview, setOverview] = useState<ValueFields<MatchingMetadata>>()
    const [target, setTarget] = useState<ValueFields<MatchingTarget>>()
    const [tabItems, setTabItems] = useState<any>()
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )

    useEffect(() => {
        if (id) {
            setTabItems(
                convertDataToItems({
                    messasge: (
                        <MessageBasicPage
                            queryParam={{
                                network,
                                queryFilter: {
                                    conditions: [{ matchingId: id }],
                                    sort: [{ field: "height", order: "desc" }],
                                },
                            }}
                        />
                    ),
                    carReplica: (
                        <CarReplicaPage
                            queryParam={{
                                network,
                                queryFilter: {
                                    conditions: [{ matchingId: id }],
                                    sort: [{ field: "carId", order: "asc" }],
                                },
                            }}
                        />
                    ),
                    bids: (
                        <MatchingBidBasicPage
                            queryParam={{
                                network,
                                queryFilter: {
                                    conditions: [{ matchingId: id }],
                                },
                            }}
                        />
                    ),
                })
            )

            getMatchingMetadata({
                network,
                queryFilter: { conditions: [{ matchingId: id }] },
            }).then((res) => {
                const datasetMetadata = res.data
                //TODO
                setOverview(datasetMetadata![0])
            })

            getMatchingTarget({
                network,
                queryFilter: { conditions: [{ matchingId: id }] },
            }).then((res) => {
                const datasetMetadata = res.data
                //TODO
                setTarget(datasetMetadata![0])
            })
        }
    }, [id])

    return (
        <>
            {overview && (
                <>
                    <MatchingMetadataDescription data={overview} />
                </>
            )}
            {target && (
                <>
                    <MatchingTargetDescription data={target} />
                </>
            )}
            {/* <MatchingWinnerDescription data={{} as MatchingBid} /> */}
            <Tabs
                defaultActiveKey="Bids"
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
