import React, { useEffect, useState } from "react"
import { TablePaginationConfig } from "antd"
import { Input, Space } from "antd"
import { Result, ValueFields } from "@unipackage/utils"
import { QueryFilter } from "@unipackage/datastore"
import { QueryParam } from "@/messagehub/queryParams"
import {
    onSearchBasic,
    handleTableChangeBasic,
} from "@/components/table/shared"
const { Search } = Input
import { ITableProps } from "@unipackage/webkit"

interface FuzzySearchKeys<T> {
    stringIncludeKeys: (keyof ValueFields<T>)[]
    intEqualKeys?: (keyof ValueFields<T>)[]
}

interface IProps<T> {
    dynamicTable: (props: ITableProps<ValueFields<T>>) => React.JSX.Element
    queryParam: QueryParam<T>
    fuzzySearchKeys: FuzzySearchKeys<T>
    getObjects: (queryParam: QueryParam<T>) => Promise<Result<ValueFields<T>[]>>
    getObjectsCount: (queryParam: QueryParam<T>) => Promise<Result<number>>
}

export default function index<T>({
    dynamicTable,
    queryParam,
    fuzzySearchKeys,
    getObjects,
    getObjectsCount,
}: IProps<T>) {
    const [dataList, setDataList] = useState<ValueFields<T>[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: queryParam?.queryFilter?.page,
        pageSize: queryParam?.queryFilter?.limit,
    })
    const [search, setSearch] = useState<string>("")

    const stringIncludeCondition: QueryFilter<ValueFields<T>>[] =
        fuzzySearchKeys.stringIncludeKeys.map((value) => {
            const condition = {
                conditions: [{ [value]: { $regex: search } }],
            }
            return condition as QueryFilter<ValueFields<T>>
        })

    const intEqualCondition: QueryFilter<ValueFields<T>>[] =
        fuzzySearchKeys.intEqualKeys
            ? fuzzySearchKeys.intEqualKeys.map((value) => {
                  const condition = {
                      conditions: [{ [value]: { $eq: parseInt(search) } }],
                  }
                  return condition as QueryFilter<ValueFields<T>>
              })
            : []

    const currentQueryParams: QueryParam<T> = {
        network: queryParam?.network,
        queryFilter: queryParam?.queryFilter && {
            ...queryParam.queryFilter,
            page: pagination.current,
            limit: pagination.pageSize,
            or: [...stringIncludeCondition, ...intEqualCondition],
        },
    }

    // get count when refresh page,do one time
    useEffect(() => {
        getObjectsCount(currentQueryParams).then((res) => {
            const totalRes = res.data
            setPagination({
                ...pagination,
                total: totalRes,
            })
        })
    }, [search])

    // get count when use click page number,do multi times
    useEffect(() => {
        if (pagination.total) {
            setLoading(true)
            getObjects(currentQueryParams).then((res) => {
                setDataList(res.data)
                setLoading(false)
            })
        }
    }, [JSON.stringify(pagination), search])

    const handleTableChange = (_pagination: TablePaginationConfig) => {
        handleTableChangeBasic({
            newPagination: _pagination,
            oldPagination: pagination,
            setDataList,
            setPagination,
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
    const DynamicTable = dynamicTable

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Space direction="vertical">
                    <Search
                        placeholder="search"
                        onSearch={onSearch}
                        style={{ width: 300 }}
                    />
                </Space>
            </div>
            {dataList && (
                <DynamicTable
                    data={dataList}
                    pagination={pagination ? pagination : {}}
                    loading={loading}
                    onChange={handleTableChange}
                />
            )}
        </>
    )
}
