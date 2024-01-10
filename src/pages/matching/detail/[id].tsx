import { Tabs } from "antd"
import { useRouter } from "next/router"
import { MatchingMetadataDescription } from "@/components/description/matching"
import { MatchingTargetDescription } from "@/components/description/matching/target"
import { MatchingWinnerDescription } from "@/components/description/matching/winner"
import { MatchingMetadata, MatchingTarget } from "@dataswapjs/dataswapjs"
import { useEffect, useState } from "react"
import axios from "axios"
import { convertDataToItems } from "@unipackage/webkit"
import { ValueFields } from "@unipackage/utils"
import { MatchingBid } from "@/shared/types"
import CarReplicaPage from "../../basic/tabel/carReplica"
import MessageBasicPage from "../../basic/tabel/message"
import { getMatchingMetadata } from "@/shared/messagehub/get"

const onChange = (key: string) => {
    console.log(key)
}

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [overview, setOverview] = useState<ValueFields<MatchingMetadata>>()
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
        }
    }, [id])

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
