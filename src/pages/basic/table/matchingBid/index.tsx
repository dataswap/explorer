import React from "react"
import { QueryParam } from "@/shared/messagehub/queryParams"
import CommonTable from "@/components/table/index"
import Table from "@/components/table/view/matching/bids"
import { MatchingBid } from "@dataswapjs/dataswapjs"
import {
    getMatchingBids,
    getMatchingBidsCount,
} from "../../../../shared/messagehub/get"

interface IProps {
    queryParam: QueryParam<MatchingBid>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Table}
                    queryParam={queryParam}
                    fuzzySearchKeys={{
                        stringIncludeKeys: ["bidder"],
                    }}
                    getObjects={getMatchingBids}
                    getObjectsCount={getMatchingBidsCount}
                />
            }
        </>
    )
}