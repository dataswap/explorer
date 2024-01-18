import { Tabs } from "antd"
import { useRouter } from "next/router"
import { MatchingMetadataDescription } from "@/components/description/matching"
import { MatchingTargetDescription } from "@/components/description/matching/target"
import { MatchingMetadata, MatchingTarget } from "@dataswapjs/dataswapjs"
import { useEffect, useState } from "react"
import { convertDataToItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import CarReplicaTable from "../../../components/table/service/carReplica"
import MessageTable from "../../../components/table/service/message"
import MatchingBidTable from "../../../components/table/service/matchingBid"
import { getMatchingMetadata, getMatchingTarget } from "@/messagehub/get"
import { useSelector } from "react-redux"

const onChange = (key: string) => {
    // console.log(key)
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
                        <MessageTable
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
                        <CarReplicaTable
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
                        <MatchingBidTable
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
                const result = res.data
                //TODO
                setOverview(result![0])
            })

            getMatchingTarget({
                network,
                queryFilter: { conditions: [{ matchingId: id }] },
            }).then((res) => {
                const result = res.data
                //TODO
                setTarget(result![0])
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
            <Tabs
                defaultActiveKey="messasge"
                items={tabItems}
                onChange={onChange}
            />
        </>
    )
}
