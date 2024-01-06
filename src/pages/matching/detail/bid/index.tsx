import React, { useEffect, useState } from "react"
import { Descriptions } from "antd"
import axios from "axios"
import { MatchingOverviewType, MatchingBidType } from "@dataswapjs/dataswapjs"
import { MatchingBidsDescription } from "@/components/description/matching/bid"

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
        return <>{overview && <MatchingBidsDescription data={overview} />}</>
    } else {
        return <p>Invalid ID</p>
    }
}
