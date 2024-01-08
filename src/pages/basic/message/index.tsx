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
                },
            }).then((res) => {
                setDataList(res.data)
                setLoading(false)
            })
        }
    }, [JSON.stringify(pagination)])

    const handleTableChange = (_pagination: TablePaginationConfig) => {
        console.log("user click page number", _pagination)
        setPagination(_pagination)
        // `dataSource` is useless since `pageSize` changed
        if (_pagination.pageSize !== pagination?.pageSize) {
            setDataList([])
        }
    }

    return (
        <>
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
