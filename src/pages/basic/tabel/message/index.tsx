import React from "react"
import { QueryParam } from "@/shared/messagehub/queryParams"
import CommonTable from "@/components/table/index"
import Tabel from "@/components/table/view/message"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import {
    getDataswapMessage,
    getDataswapMessageCount,
} from "../../../../shared/messagehub/get"

interface IProps {
    queryParam: QueryParam<DataswapMessage>
}

export default function index({ queryParam }: IProps) {
    return (
        <>
            {
                <CommonTable
                    dynamicTable={Tabel}
                    queryParam={queryParam}
                    fuzzySearchKeys={{
                        stringIncludeKeys: ["method", "from", "to"],
                        intEqualKeys: ["height"],
                    }}
                    getObjects={getDataswapMessage}
                    getObjectsCount={getDataswapMessageCount}
                />
            }
        </>
    )
}
