import { DatasetOverviewType } from "@/types/dataset"
import Link from "next/link"
import { IDatasetOverviewTabel } from "@/components/dataset/overview/tabel"
import { Button, Form, InputNumber, Input, Select, Space, Switch } from "antd"

export function getDatasetOverviewTabel(
    datasetOverviews: DatasetOverviewType[],
    handleClose: (id: number) => void
): IDatasetOverviewTabel[] {
    const result: IDatasetOverviewTabel[] = []

    datasetOverviews.forEach((datasetOverview, index) => {
        result[index] = {
            key: datasetOverview.id,
            id: (
                <Link href={`/dataset/detail/${datasetOverview.id}`}>
                    {datasetOverview.id}
                </Link>
            ),
            name: (
                <Link href={`/dataset/detail/${datasetOverview.id}`}>
                    {datasetOverview.name}
                </Link>
            ),
            createdHeight: datasetOverview.createdHeight,
            createdTime: datasetOverview.createdTime,
            size: datasetOverview.size,
            submitter: datasetOverview.submitter,
            state: datasetOverview.state,
            operate: (
                <>
                    <Link
                        href={`/dataset/submit/${datasetOverview.operate}/${datasetOverview.id}`}
                    >
                        {datasetOverview.operate}
                    </Link>
                    {datasetOverview.state === "DisputeInitiationPeriod" && (
                        <Button
                            type="text"
                            htmlType="button"
                            onClick={() => handleClose(datasetOverview.id)}
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
