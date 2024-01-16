import React from "react"
import { QueryParam } from "@/shared/messagehub/queryParams"
import CommonTable from "@/components/table/index"
import Tabel from "@/components/table/view/car"
import { Car } from "@dataswapjs/dataswapjs"
import { getCar, getCarCount } from "../../../../shared/messagehub/get"

interface IProps {
    queryParam: QueryParam<Car>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Tabel}
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
