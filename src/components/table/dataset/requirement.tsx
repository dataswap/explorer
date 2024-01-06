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
import { DatasetRequirement } from "@dataswapjs/dataswapjs"
import Link from "next/link"
import { FromType, ValueFields } from "@unipackage/utils"
import { config_datasetDetailPageRoot } from "../../../config/links"

interface DatasetRequirementTabelItem
    extends FromType<
        ValueFields<DatasetRequirement>,
        | "index"
        | "dataPreparers"
        | "storageProviders"
        | "regionCode"
        | "cityCodes"
        | "countryCode"
    > {
    key: React.ReactNode
    datasetId: React.ReactNode
}

interface IProps {
    data: ValueFields<DatasetRequirement>[]
}

export default ({ data }: IProps) => {
    const columns = generateTableColumns<DatasetRequirementTabelItem>({
        index: "10%",
        datasetId: "15%",
        dataPreparers: "15%",
        storageProviders: "15%",
        regionCode: "15%",
        countryCode: "15%",
        cityCodes: "15%",
    })

    const tabelItems: DatasetRequirementTabelItem[] = convertDataToTableItems<
        ValueFields<DatasetRequirement>,
        DatasetRequirementTabelItem
    >(data, (item) => ({
        key: item.index?.toString(),
        datasetId: (
            <Link href={`${config_datasetDetailPageRoot}/${item.datasetId}`}>
                {item.datasetId}
            </Link>
        ),
        dataPreparers: item.dataPreparers,
        storageProviders: item.storageProviders,
        regionCode: item.regionCode,
        countryCode: item.countryCode,
        cityCodes: item.cityCodes,
    }))

    return (
        <Table<DatasetRequirementTabelItem>
            columns={columns}
            data={tabelItems}
        />
    )
}
