import React from "react"
import Link from "next/link"
import { ValueFields, enumToString } from "@unipackage/utils"
import { Table } from "antd"
import {
    generateTableColumns,
    extendWithKeyForTableData,
    ITableProps,
} from "@unipackage/webkit"
import {
    Car,
    CarReplica,
    CarReplicaState,
    DataType,
} from "@dataswapjs/dataswapjs"
import {
    config_carDetailPageRoot,
    config_datasetDetailPageRoot,
    config_matchingDetailPageRoot,
} from "../../../../config/links"

interface TabelItem
    extends Pick<
        ValueFields<Car>,
        | "datasetId"
        | "carId"
        | "hash"
        | "replicasCount"
        | "matchingIds"
        | "size"
        | "dataType"
        | "cid"
        | "replicaInfos"
    > {
    key: React.ReactNode
}

export default ({
    data,
    pagination,
    loading,
    onChange,
}: ITableProps<ValueFields<Car>>) => {
    const columns = generateTableColumns<TabelItem>({
        shared: {
            ellipsis: true,
            align: "center",
        },
        independent: {
            carId: {
                width: "10%",
                render: (value) => (
                    <Link href={`${config_carDetailPageRoot}/${value}`}>
                        {value}
                    </Link>
                ),
            },
            dataType: {
                width: "15%",
                render: (value: DataType) => enumToString(DataType, value),
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
            size: { width: "15%" },
            hash: {
                width: "18%",
            },
            cid: { width: "15%" },
            replicasCount: {
                width: "18%",
                hidden: true,
            },
            matchingIds: {
                width: "15%",
                render: (_, record) => {
                    const currentMatchingIds = record.replicaInfos
                        ?.filter((value) => value.matchingId > 0)
                        .map((value) => value.matchingId)

                    return (
                        <>
                            {currentMatchingIds?.map((value, index) => (
                                <React.Fragment key={value}>
                                    {index > 0 && ", "}
                                    <Link
                                        href={`${config_matchingDetailPageRoot}/${value}`}
                                    >
                                        {value}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </>
                    )
                },
            },
            replicaInfos: {
                title: "Completion Rate",
                width: "15%",
                render: (values: CarReplica[], record) => (
                    <>
                        {
                            values.filter((value) => {
                                return (
                                    Number(value.state) ===
                                    Number(CarReplicaState.Stored)
                                )
                            }).length
                        }
                        / {record.replicasCount}
                    </>
                ),
            },
        },
    })

    return (
        <Table<TabelItem>
            columns={columns}
            dataSource={extendWithKeyForTableData<ValueFields<Car>>({
                dataArray: data,
                keyField: "carId",
            })}
            pagination={pagination}
            loading={loading}
            onChange={onChange}
        />
    )
}
