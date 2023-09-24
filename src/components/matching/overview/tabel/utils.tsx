import { MatchingOverviewType } from "@/types/matching"
import Link from "next/link"
import { IMatchingOverviewTabel } from "@/components/matching/overview/tabel"
import { Button, Form, InputNumber, Input, Select, Space, Switch } from "antd"
import { CloseCircleOutlined } from "@ant-design/icons"

export function getMatchingOverviewTabel(
    overviews: MatchingOverviewType[],
    handleClose: (id: number) => void
): IMatchingOverviewTabel[] {
    const result: IMatchingOverviewTabel[] = []

    overviews.forEach((overview, index) => {
        result[index] = {
            key: overview.id,
            id: (
                <Link href={`/matching/detail/${overview.id}`}>
                    {overview.id}
                </Link>
            ),
            datasetId: (
                <Link href={`/dataset/detail/${overview.datasetId}`}>
                    {overview.datasetId}
                </Link>
            ),
            replicaId: overview.replicaId,
            initialPrice: overview.initialPrice,
            createdTime: overview.createdTime,
            size: overview.size,
            submitter: overview.submitter,
            state: overview.state,
            operate: (
                <>
                    <Link
                        href={`/matching/submit/${overview.operate}/${overview.id}`}
                    >
                        {overview.operate}
                    </Link>
                    {overview.state !== "Complete" &&
                        overview.state !== "Failed" && (
                            <Button
                                type="text"
                                htmlType="button"
                                onClick={() => handleClose(overview.id)}
                            >
                                {/* <CloseCircleOutlined style={{ color: "blue" }} /> */}
                                <span style={{ color: "blue" }}>Close</span>
                            </Button>
                        )}
                </>
            ),
        }
    })

    return result
}
