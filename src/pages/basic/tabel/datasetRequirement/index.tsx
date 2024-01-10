import React, { useEffect, useState } from "react"
import { DatasetRequirement } from "@dataswapjs/dataswapjs"
import DatasetRequirementTabel from "@/components/table/dataset/requirement"
import {
    getDatasetRequirement,
    getDatasetRequirementCount,
} from "../../../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"
import { defaultTableQueryParams } from "../../../../config/params"
import { Input, Space } from "antd"
import { TablePaginationConfig } from "antd"
import { onSearchBasic, handleTableChangeBasic } from "@/shared/table"
import { QueryParam } from "@/shared/messagehub/queryParams"
const { Search } = Input

interface IProps {
    queryParam: QueryParam<DatasetRequirement>
}

export default ({ queryParam }: IProps) => {
    const [dataLis, setDataList] = useState<ValueFields<DatasetRequirement>[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: defaultTableQueryParams.page,
        pageSize: defaultTableQueryParams.limit,
    })
    const [search, setSearch] = useState<string>("")

    const currentQueryParams: QueryParam<DatasetRequirement> = {
        network: queryParam?.network,
        queryFilter: queryParam?.queryFilter && {
            ...queryParam.queryFilter,
            page: pagination.current,
            limit: pagination.pageSize,
        },
    }

    // get count when refresh page,do one time
    useEffect(() => {
        console.log("before getDatasetRequirementCount", pagination)
        getDatasetRequirementCount(currentQueryParams).then((res) => {
            const totalRes = res.data
            setPagination({
                ...pagination,
                total: totalRes,
            })
        })
    }, [search])

    useEffect(() => {
        setLoading(true)
        console.log("before getDatasetRequirement", currentQueryParams)
        getDatasetRequirement(currentQueryParams).then((res) => {
            const datasetOveriew = res.data
            setDataList(datasetOveriew)
            setLoading(false)
        })
    }, [JSON.stringify(pagination), search])

    const handleTableChange = (_pagination: TablePaginationConfig) => {
        handleTableChangeBasic({
            newPagination: _pagination,
            oldPagination: pagination,
            setPagination,
            setDataList,
        })
    }

    const onSearch = (_search: string) => {
        onSearchBasic({
            newSearch: _search,
            oldSearch: search,
            setSearch,
            setDataList,
        })
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Space direction="vertical">
                    <Search
                        placeholder="search:Height/Name/Submitter/accessMethod"
                        onSearch={onSearch}
                        style={{ width: 300 }}
                    />
                </Space>
            </div>

            {dataLis && (
                <DatasetRequirementTabel
                    data={dataLis}
                    pagination={pagination ? pagination : {}}
                    loading={loading}
                    onChange={handleTableChange}
                />
            )}
        </>
    )
}
