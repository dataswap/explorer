import React, { useEffect, useState } from "react"
import { Car } from "@dataswapjs/dataswapjs"
import CarTabel from "@/components/table/car"
import { getCar, getCarCount } from "../../../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"
import { QueryParam } from "@/shared/messagehub/queryParams"
import { TablePaginationConfig } from "antd"
import { Input, Space } from "antd"
import { onSearchBasic, handleTableChangeBasic } from "@/shared/table"
const { Search } = Input

interface IProps {
    queryParam: QueryParam<Car>
}

export default ({ queryParam }: IProps) => {
    const [dataList, setDataList] = useState<ValueFields<Car>[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: queryParam?.queryFilter?.page,
        pageSize: queryParam?.queryFilter?.limit,
    })
    const [search, setSearch] = useState<string>("")

    const currentQueryParams: QueryParam<Car> = {
        network: queryParam?.network,
        queryFilter: queryParam?.queryFilter && {
            ...queryParam.queryFilter,
            page: pagination.current,
            limit: pagination.pageSize,
            or: [{ conditions: [{ hash: { $regex: search } }] }],
        },
    }

    // get count when refresh page,do one time
    useEffect(() => {
        console.log("before getDataswapMessageCount", pagination)
        getCarCount(currentQueryParams).then((res) => {
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
            console.log("before getDataswapMessage", pagination)
            setLoading(true)
            getCar(currentQueryParams).then((res) => {
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

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Space direction="vertical">
                    <Search
                        placeholder="search:Hash"
                        onSearch={onSearch}
                        style={{ width: 300 }}
                    />
                </Space>
            </div>
            {dataList && (
                <CarTabel
                    data={dataList}
                    pagination={pagination ? pagination : {}}
                    loading={loading}
                    onChange={handleTableChange}
                />
            )}
        </>
    )
}
