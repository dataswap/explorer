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
import { getMatchingMetadata, getMatchingTarget } from "@/shared/messagehub/get"

const onChange = (key: string) => {
    console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [overview, setOverview] = useState<ValueFields<MatchingMetadata>>()
    const [target, setTarget] = useState<ValueFields<MatchingTarget>>()
    const [tabItems, setTabItems] = useState<any>()

    useEffect(() => {
        if (id) {
            setTabItems(
                convertDataToItems({
                    messasge: (
                        <MessageBasicPage
                            queryParam={{
                                network: "calibration",
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
                                network: "calibration",
                                queryFilter: {
                                    conditions: [{ matchingId: id }],
                                    sort: [{ field: "carId", order: "desc" }],
                                },
                            }}
                        />
                    ),
                })
            )

            getMatchingMetadata({
                network: "calibration",
                queryFilter: { conditions: [{ matchingId: id }] },
            }).then((res) => {
                const datasetMetadata = res.data
                //TODO
                setOverview(datasetMetadata![0])
            })

            getMatchingTarget({
                network: "calibration",
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
