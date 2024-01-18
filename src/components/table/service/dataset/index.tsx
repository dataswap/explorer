import React from "react"
import { QueryParam } from "@/messagehub/queryParams"
import CommonTable from "@/components/table/data"
import Table from "@/components/table/view/dataset"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import {
    getDatasetMetadata,
    getDatasetMetadataCount,
} from "../../../../messagehub/get"

interface IProps {
    queryParam: QueryParam<DatasetMetadata>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Table}
                    queryParam={queryParam}
                    fuzzySearchKeys={{
                        stringIncludeKeys: [
                            "accessMethod",
                            "submitter",
                            "name",
                        ],
                        intEqualKeys: ["createdBlockNumber"],
                    }}
                    getObjects={getDatasetMetadata}
                    getObjectsCount={getDatasetMetadataCount}
                />
            }
        </>
    )
}
