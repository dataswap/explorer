import React from "react"
import { QueryParam } from "@/messagehub/queryParams"
import CommonTable from "@/components/table/data"
import Table from "@/components/table/view/matching"
import { MatchingMetadata } from "@dataswapjs/dataswapjs"
import {
    getMatchingMetadata,
    getMatchingMetadataCount,
} from "../../../../messagehub/get"

interface IProps {
    queryParam: QueryParam<MatchingMetadata>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Table}
                    queryParam={queryParam}
                    fuzzySearchKeys={{
                        stringIncludeKeys: ["initiator"],
                    }}
                    getObjects={getMatchingMetadata}
                    getObjectsCount={getMatchingMetadataCount}
                />
            }
        </>
    )
}
