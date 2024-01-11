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
    generateTableColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { Table } from "antd"
import { MatchingTarget } from "@dataswapjs/dataswapjs"
import { FromType, ValueFields } from "@unipackage/utils"
import type { TablePaginationConfig } from "antd/es/table"
import Link from "next/link"
import {
    config_matchingDetailPageRoot,
    config_datasetDetailPageRoot,
} from "../../../config/links"

interface MatchingTabelItem
    extends FromType<
        ValueFields<MatchingTarget>,
        | "replicaIndex"
        | "matchingId"
        | "associatedMappingFilesMatchingID"
        | "dataType"
        | "size"
        | "subsidy"
        | "cars"
    > {
    key: React.ReactNode
    id: React.ReactNode //matchingId
    datasetID: React.ReactNode //datasetID
}

interface IProps {
    data: ValueFields<MatchingTarget>[]
    pagination: TablePaginationConfig
    loading: boolean
    onChange: (pagination: TablePaginationConfig) => void
}

export default ({ data, pagination, loading, onChange }: IProps) => {
    const columns = generateTableColumns<MatchingTabelItem>({
        id: "7.5%",
        datasetID: "10%",
        replicaIndex: "7.5%",
        matchingId: "7.5%",
        associatedMappingFilesMatchingID: "15%",
        dataType: "10%",
        size: "7.5%",
        subsidy: "10%",
        cars: "10%",
    })

    const tabelItems: MatchingTabelItem[] = convertDataToTableItems<
        ValueFields<MatchingTarget>,
        MatchingTabelItem
    >(data, (item) => ({
        key: item.matchingId,
        id: (
            <Link href={`/${config_matchingDetailPageRoot}/${item.matchingId}`}>
                {item.matchingId}
            </Link>
        ),
        datasetID: (
            <Link href={`/${config_datasetDetailPageRoot}/${item.datasetID}`}>
                {item.datasetID}
            </Link>
        ),
        replicaIndex: item.replicaIndex,
        associatedMappingFilesMatchingID: item.associatedMappingFilesMatchingID,
        dataType: item.dataType,
        matchingId: item.matchingId,
        size: item.size,
        subsidy: item.subsidy,
        cars: item.cars,
    }))

    return (
        <Table<MatchingTabelItem>
            columns={columns}
            dataSource={tabelItems}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
