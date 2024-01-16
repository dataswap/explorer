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
    extendWithKeyForTableData,
    ITableProps,
} from "@unipackage/webkit"
import { Table } from "antd"
import { MatchingMetadata } from "@dataswapjs/dataswapjs"
import { ValueFields } from "@unipackage/utils"
import Link from "next/link"
import {
    config_matchingDetailPageRoot,
    config_datasetDetailPageRoot,
} from "../../../../config/links"

interface TabelItem
    extends Pick<
        ValueFields<MatchingMetadata>,
        | "matchingId"
        | "datasetId"
        | "replicaIndex"
        | "initiator"
        | "createdBlockNumber"
        | "biddingThreshold"
    > {
    key: React.ReactNode
}

export default ({
    data,
    pagination,
    loading,
    onChange,
}: ITableProps<ValueFields<MatchingMetadata>>) => {
    const columns = generateTableColumns<TabelItem>({
        shared: {
            ellipsis: true,
        },
        independent: {
            matchingId: {
                width: "10%",
                render: (value) => (
                    <Link href={`/${config_matchingDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
            },
            datasetId: {
                width: "10%",
                render: (value) => (
                    <Link href={`/${config_datasetDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
            },
            replicaIndex: { width: "7.5%" },
            initiator: { width: "15%" },
            createdBlockNumber: { width: "7.5%" },
            biddingThreshold: { width: "7.5%" },
        },
    })

    return (
        <Table<TabelItem>
            columns={columns}
            dataSource={extendWithKeyForTableData<
                ValueFields<MatchingMetadata>
            >({ dataArray: data, keyField: "matchingId" })}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
