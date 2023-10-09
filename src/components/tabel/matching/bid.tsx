import React from "react"
import {
    Tabel,
    generateTabelColumns,
    convertDataToTableItems,
} from "@dataswapjs/webutils"
import { MatchingBidType } from "@dataswapjs/dataswap-sdk"

interface MatchingBidsTabelItem {
    key: React.ReactNode
    bidder: string
    bid: string
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
