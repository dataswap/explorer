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
import { DatasetRequirement, MatchingInfo } from "@dataswapjs/dataswapjs"
import Link from "next/link"
import { ValueFields } from "@unipackage/utils"
import { config_datasetDetailPageRoot } from "../../../../config/links"

interface TabelItem
    extends Pick<
        ValueFields<DatasetRequirement>,
        | "datasetId"
        | "index"
        | "dataPreparers"
        | "storageProviders"
        | "regionCode"
        | "cityCodes"
        | "countryCode"
        | "matchings"
    > {
    key: React.ReactNode
    matchingIds?: React.ReactNode
    completionRate?: React.ReactNode
}

export default ({
    data,
    pagination,
    loading,
    onChange,
}: ITableProps<ValueFields<DatasetRequirement>>) => {
    const columns = generateTableColumns<TabelItem>({
        shared: {
            ellipsis: true,
        },
        independent: {
            index: { width: "10%" },
            datasetId: {
                width: "15%",
                render: (value) => (
                    <Link href={`${config_datasetDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
            },
            dataPreparers: { width: "15%" },
            storageProviders: { width: "15%" },
            regionCode: { width: "15%" },
            countryCode: { width: "15%" },
            cityCodes: { width: "15%" },
            matchings: {
                width: "15%",
                hidden: true,
            },
            matchingIds: {
                width: "15%",
                render: (_, record) => {
                    return <></>
                },
            },
            completionRate: {
                width: "15%",
                render: (_, record) => {
                    return (
                        <>
                            {record.matchings?.reduce((sum, currentValue) => {
                                return sum + Number(currentValue.finishedSize)
                            }, 0)}{" "}
                            / totalSize(datasetProof)
                        </>
                    )
                },
            },
        },
    })

    return (
        <Table<TabelItem>
            columns={columns}
            dataSource={extendWithKeyForTableData<
                ValueFields<DatasetRequirement>
            >({ dataArray: data, keyField: "index" })}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
