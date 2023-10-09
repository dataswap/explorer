import React, { useEffect, useState } from "react"
import { Descriptions } from "antd"
import axios from "axios"
import MatchingBidsTabel from "@/components/tabel/matching/bid"
import { MatchingOverviewType, MatchingBidType } from "@dataswapjs/dataswap-sdk"
import { getMatchingBidsDescriptionItems } from "@/components/matching/utils"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [list, setList] = useState<MatchingBidType[]>()
    const [overview, setOverview] = useState<MatchingOverviewType>()

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/matchingsInfo/${id}`).then((res) => {
                setOverview(res.data)
                res.data.bids
                    ? setList(Object.values(res.data.bids))
                    : setList([])
            })
    }, [])

    if (id != 0) {
        return (
            <>
                {overview && (
                    <Descriptions
                        title=""
                        items={getMatchingBidsDescriptionItems(overview)}
                    />
                )}
                {list && <MatchingBidsTabel data={list} />}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
