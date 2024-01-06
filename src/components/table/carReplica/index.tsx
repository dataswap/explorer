import React from "react"
import {
    Table,
    generateTableColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { CarReplica } from "@dataswapjs/dataswapjs"
import { FromType, ValueFields } from "@unipackage/utils"

interface CarReplicaTabelItem
    extends FromType<
        ValueFields<CarReplica>,
        "filecoinClaimId" | "matchingId" | "state"
    > {
    key: React.ReactNode
    carId: React.ReactNode
}

interface IProps {
    data: CarReplica[]
}

export default ({ data }: IProps) => {
    const columns = generateTableColumns<CarReplicaTabelItem>({
        carId: "20%",
        matchingId: "20%",
        filecoinClaimId: "30%",
        state: "30%",
    })

    const tabelItems: CarReplicaTabelItem[] = convertDataToTableItems<
        CarReplica,
        CarReplicaTabelItem
    >(data, (item) => ({
        key: item.matchingId.toString(),
        //TODO:add carId
        carId: "",
        matchingId: item.matchingId,
        filecoinClaimId: item.filecoinClaimId,
        state: item.state,
    }))

    return <Table<CarReplicaTabelItem> columns={columns} data={tabelItems} />
}
