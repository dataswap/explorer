import React from "react"
import { QueryParam } from "@/shared/messagehub/queryParams"
import CommonTable from "@/components/table/index"
import Table from "@/components/table/view/carReplica"
import { CarReplica } from "@dataswapjs/dataswapjs"
import {
    getCarReplica,
    getCarReplicaCount,
} from "../../../../shared/messagehub/get"

interface IProps {
    queryParam: QueryParam<CarReplica>
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
                    getObjects={getCarReplica}
                    getObjectsCount={getCarReplicaCount}
                />
            }
        </>
    )
}