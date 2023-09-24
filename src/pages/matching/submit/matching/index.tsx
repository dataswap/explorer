import React, { useEffect, useState } from "react"
import type { DescriptionsProps } from "antd"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import { DatasetOverviewType, DatasetDisputeType } from "@/types/dataset"
import DatasetDisputeTabel, {
    IDatasetDisputeTabel,
} from "@/components/dataset/dispute/tabel"
import { getDatasetDisputeChallengeTabel } from "@/components/dataset/dispute/tabel/utils"
import { getDatasetDisputeDescriptionItems } from "@/components/dataset/utils"

export default () => {
    const router = useRouter()
    const { datasetId, replicaId } = router.query
    return (
        <div>
            {datasetId}-{replicaId}
        </div>
    )
}
