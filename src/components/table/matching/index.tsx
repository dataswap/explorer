/*******************************************************************************
 *   (c) 2024 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import React from "react"
import {
    Table,
    generateTableColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { MatchingMetadata } from "@dataswapjs/dataswapjs"
import { FromType, ValueFields } from "@unipackage/utils"
import Link from "next/link"
import {
    config_matchingDetailPageRoot,
    config_datasetDetailPageRoot,
} from "../../../config/links"

interface MatchingTabelItem
    extends FromType<
        ValueFields<MatchingMetadata>,
        "initiator" | "createdBlockNumber"
    > {
    key: React.ReactNode
    id: React.ReactNode //matchingId
    datasetId: React.ReactNode //datasetID
    replicaId?: string //replicaIndex
    createdTime: string
    initialPrice: string //biddingThreshold
    status: string //TODO,add by metadata
}

interface IProps {
    data: ValueFields<MatchingMetadata>[]
}

export default ({ data }: IProps) => {
    const columns = generateTableColumns<MatchingTabelItem>({
        id: "7.5%",
        datasetId: "10%",
        replicaId: "7.5%",
        createdBlockNumber: "7.5%",
        createdTime: "15%",
        initiator: "15%",
        initialPrice: "7.5%",
        status: "15%",
    })

    const tabelItems: MatchingTabelItem[] = convertDataToTableItems<
        ValueFields<MatchingMetadata>,
        MatchingTabelItem
    >(data, (item) => ({
        key: item.matchingId,
        id: (
            <Link href={`/${config_matchingDetailPageRoot}/${item.matchingId}`}>
                {item.matchingId}
            </Link>
        ),
        datasetId: (
            <Link href={`/${config_datasetDetailPageRoot}/${item.datasetId}`}>
                {item.datasetId}
            </Link>
        ),
        replicaId: item.replicaIndex?.toString(),
        createdTime: "",
        initialPrice: item.biddingThreshold.toString(),
        status: "",
        initiator: item.initiator,
        createdBlockNumber: item.createdBlockNumber,
    }))

    return <Table<MatchingTabelItem> columns={columns} data={tabelItems} />
}
