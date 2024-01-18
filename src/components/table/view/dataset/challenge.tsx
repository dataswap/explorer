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
import { ValueFields } from "@unipackage/utils"
import Link from "next/link"
import { DatasetChallenge } from "@dataswapjs/dataswapjs"
import {
    config_challengeDetailPageRoot,
    config_datasetDetailPageRoot,
} from "../../../../config/links"

interface TabelItem
    extends Pick<
        ValueFields<DatasetChallenge>,
        "auditor" | "datasetId" | "randomSeed"
    > {
    key: React.ReactNode
}

export default ({
    data,
    pagination,
    loading,
    onChange,
}: ITableProps<ValueFields<DatasetChallenge>>) => {
    const columns = generateTableColumns<TabelItem>({
        shared: {
            ellipsis: true,
            align: "center",
        },
        independent: {
            randomSeed: {
                width: "15%",
                render: (value) => (
                    <Link href={`${config_challengeDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
            },
            auditor: {
                width: "15%",
            },
            datasetId: {
                width: "15%",
                render: (value) => (
                    <Link href={`${config_datasetDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
                hidden: true,
            },
        },
    })

    return (
        <Table<TabelItem>
            columns={columns}
            dataSource={extendWithKeyForTableData<
                ValueFields<DatasetChallenge>
            >({ dataArray: data, keyField: "randomSeed" })}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
