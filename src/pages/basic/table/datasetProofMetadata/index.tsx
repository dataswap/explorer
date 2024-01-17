import React from "react"
import { QueryParam } from "@/shared/messagehub/queryParams"
import CommonTable from "@/components/table/index"
import Table from "@/components/table/view/dataset/proofMetadata"
import { DatasetProofMetadata } from "@dataswapjs/dataswapjs"
import {
    getDatasetProofMetadata,
    getDatasetProofMetadataCount,
} from "../../../../shared/messagehub/get"

interface IProps {
    queryParam: QueryParam<DatasetProofMetadata>
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
                    getObjects={getDatasetProofMetadata}
                    getObjectsCount={getDatasetProofMetadataCount}
                />
            }
        </>
    )
}
