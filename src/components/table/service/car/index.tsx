import React from "react"
import { QueryParam } from "@/messagehub/queryParams"
import CommonTable from "@/components/table/data"
import Table from "@/components/table/view/car"
import { Car } from "@dataswapjs/dataswapjs"
import { getCar, getCarCount } from "../../../../messagehub/get"

interface IProps {
    queryParam: QueryParam<Car>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Table}
                    queryParam={queryParam}
                    fuzzySearchKeys={{
                        stringIncludeKeys: ["hash"],
                    }}
                    getObjects={getCar}
                    getObjectsCount={getCarCount}
                />
            }
        </>
    )
}
