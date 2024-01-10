import React, { useEffect, useState } from "react"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import DatasetTabel from "@/components/table/dataset"
import {
    getDatasetMetadata,
    getDatasetMetadataCount,
} from "../../../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"
import { defaultTableQueryParams } from "../../../../config/params"
import { Input, Space } from "antd"
import { TablePaginationConfig } from "antd"
import { onSearchBasic, handleTableChangeBasic } from "@/shared/table"
import { QueryParam } from "@/shared/messagehub/queryParams"
const { Search } = Input

interface IProps {
    queryParam: QueryParam<DatasetMetadata>
}

export default ({ queryParam }: IProps) => {
    const [dataLis, setDataList] = useState<ValueFields<DatasetMetadata>[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: defaultTableQueryParams.page,
        pageSize: defaultTableQueryParams.limit,
    })
    const [search, setSearch] = useState<string>("")

    const currentQueryParams: QueryParam<DatasetMetadata> = {
        network: queryParam?.network,
        queryFilter: queryParam?.queryFilter && {
            ...queryParam.queryFilter,
            page: pagination.current,
            limit: pagination.pageSize,
            or: [
                { conditions: [{ accessMethod: { $regex: search } }] },
                { conditions: [{ submitter: { $regex: search } }] },
                { conditions: [{ name: { $regex: search } }] },
                {
                    conditions: [
                        { createdBlockNumber: { $eq: parseInt(search) } },
                    ],
                },
            ],
        },
    }

    // get count when refresh page,do one time
    useEffect(() => {
        console.log("before getDatasetMetadataCount", pagination)
        getDatasetMetadataCount(currentQueryParams).then((res) => {
            const totalRes = res.data
            setPagination({
                ...pagination,
                total: totalRes,
            })
        })
    }, [search])

    useEffect(() => {
        setLoading(true)
        getDatasetMetadata(currentQueryParams).then((res) => {
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
                <DatasetTabel
                    data={dataLis}
                    pagination={pagination ? pagination : {}}
                    loading={loading}
                    onChange={handleTableChange}
                />
            )}
        </>
    )
}
