import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import axios from "axios"
import MatchingBidsTabel, {
    IMatchingBidsTabel,
} from "@/components/matching/bid/tabel"
import { MatchingOverviewType } from "@/types/matching"
import { getMatchingBidsDescriptionItems } from "@/components/matching/utils"
import { getMatchingBidsTabel } from "@/components/matching/bid/tabel/utils"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [list, setList] = useState<IMatchingBidsTabel[]>()
    const [overview, setOverview] = useState<MatchingOverviewType>()
    // const router = useRouter()

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/matchingsInfo/${id}`).then((res) => {
                setOverview(res.data)
                res.data.bids
                    ? setList(
                          getMatchingBidsTabel(Object.values(res.data.bids))
                      )
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
