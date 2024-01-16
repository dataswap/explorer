import React from "react"
import { QueryParam } from "@/shared/messagehub/queryParams"
import CommonTable from "@/components/table/index"
import Tabel from "@/components/table/view/matching"
import { MatchingMetadata } from "@dataswapjs/dataswapjs"
import {
    getMatchingMetadata,
    getMatchingMetadataCount,
} from "../../../../shared/messagehub/get"

interface IProps {
    queryParam: QueryParam<MatchingMetadata>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Tabel}
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
