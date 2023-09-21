import { DatasetOverviewType } from "@/types/dataset"
import Link from "next/link"
import { IDatasetOverviewTabel } from "@/components/dataset/overview/tabel"

export function getDatasetOverviewTabel(
    datasetOverviews: DatasetOverviewType[]
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
        }
    })

    return result
}
