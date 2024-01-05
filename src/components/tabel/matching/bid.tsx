import React from "react"
import {
    Tabel,
    generateTabelColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { MatchingBidType } from "@dataswapjs/dataswapjs"

interface MatchingBidsTabelItem {
    key: React.ReactNode
    bidder: string
    bid: number
    bidTime: string
}

interface IProps {
    data: MatchingBidType[]
}

export default ({ data }: IProps) => {
    const columns = generateTabelColumns<MatchingBidsTabelItem>({
        bidder: "33.33%",
        bid: "33.33%",
        bidTime: "33.33%",
    })

    const tabelItems: MatchingBidsTabelItem[] = convertDataToTableItems<
        MatchingBidType,
        MatchingBidsTabelItem
    >(data, (item) => ({
        key: item.bidder,
        ...item,
    }))

    return <Tabel<MatchingBidsTabelItem> columns={columns} data={tabelItems} />
}
