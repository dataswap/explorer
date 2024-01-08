import React, { useEffect, useState } from "react"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import MessageTabel from "@/components/table/message"
import {
    getDataswapMessage,
    getDataswapMessageCount,
} from "../../../shared/messagehub/get"
import { ValueFields } from "@unipackage/utils"
import { QueryParam } from "@/shared/messagehub/queryParams"
import { TablePaginationConfig } from "antd"
import { Input, Space } from "antd"
const { Search } = Input

interface IProps {
    queryParam: QueryParam<DataswapMessage>
}

export default ({ queryParam }: IProps) => {
    const [dataList, setDataList] = useState<ValueFields<DataswapMessage>[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: queryParam.queryFilter?.page,
        pageSize: queryParam.queryFilter?.limit,
    })
    const [search, setSearch] = useState<string>("")

    // get count when refresh page,do one time
    useEffect(() => {
        console.log("before getDataswapMessageCount", pagination)
        getDataswapMessageCount(queryParam).then((res) => {
            const totalRes = res.data
            setPagination({
                ...pagination,
                total: totalRes,
            })
        })
    }, [])

    // get count when use click page number,do multi times
    useEffect(() => {
        if (pagination.total) {
            console.log("before getDataswapMessage", pagination)
            setLoading(true)
            getDataswapMessage({
                network: queryParam.network,
                queryFilter: {
                    ...queryParam.queryFilter,
                    page: pagination.current,
                    limit: pagination.pageSize,
                    or: [
                        { conditions: [{ from: { $regex: search } }] },
                        { conditions: [{ to: { $regex: search } }] },
                        { conditions: [{ method: { $regex: search } }] },
                        { conditions: [{ height: { $eq: parseInt(search) } }] },
                    ],
                },
            }).then((res) => {
                setDataList(res.data)
                setLoading(false)
            })
        }
    }, [JSON.stringify(pagination), search])

    const handleTableChange = (_pagination: TablePaginationConfig) => {
        console.log("user click page number", _pagination)
        setPagination(_pagination)
        // `dataSource` is useless since `pageSize` changed
        if (_pagination.pageSize !== pagination?.pageSize) {
            setDataList([])
        }
    }

    const onSearch = (_search: string) => {
        setSearch(_search)
        if (_search !== search) {
            setDataList([])
        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Space direction="vertical">
                    <Search
                        placeholder="search:Height/From/To/Method"
                        onSearch={onSearch}
                        style={{ width: 300 }}
                    />
                </Space>
            </div>
            {dataList && (
                <MessageTabel
                    data={dataList}
                    pagination={pagination ? pagination : {}}
                    loading={loading}
                    onChange={handleTableChange}
                />
            )}
        </>
    )
}
