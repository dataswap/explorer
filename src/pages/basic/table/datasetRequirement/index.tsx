import React from "react"
import { QueryParam } from "@/messagehub/queryParams"
import CommonTable from "@/components/table/index"
import Table from "@/components/table/view/dataset/requirement"
import { DatasetRequirement } from "@dataswapjs/dataswapjs"
import {
    getDatasetRequirement,
    getDatasetRequirementCount,
} from "../../../../messagehub/get"

interface IProps {
    queryParam: QueryParam<DatasetRequirement>
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
                    getObjects={getDatasetRequirement}
                    getObjectsCount={getDatasetRequirementCount}
                />
            }
        </>
    )
}
