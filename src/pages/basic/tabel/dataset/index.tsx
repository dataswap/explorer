import React from "react"
import { QueryParam } from "@/shared/messagehub/queryParams"
import CommonTable from "@/components/table/index"
import Tabel from "@/components/table/view/dataset"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import {
    getDatasetMetadata,
    getDatasetMetadataCount,
} from "../../../../shared/messagehub/get"

interface IProps {
    queryParam: QueryParam<DatasetMetadata>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Tabel}
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
