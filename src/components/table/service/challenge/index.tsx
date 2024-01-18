import React from "react"
import { QueryParam } from "@/messagehub/queryParams"
import CommonTable from "@/components/table/data"
import Table from "@/components/table/view/dataset/challenge"
import { DatasetChallenge } from "@dataswapjs/dataswapjs"
import {
    getDatasetChallenges,
    getDatasetChallengesCount,
} from "../../../../messagehub/get"

interface IProps {
    queryParam: QueryParam<DatasetChallenge>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Table}
                    queryParam={queryParam}
                    fuzzySearchKeys={{
                        stringIncludeKeys: [],
                    }}
                    getObjects={getDatasetChallenges}
                    getObjectsCount={getDatasetChallengesCount}
                />
            }
        </>
    )
}
