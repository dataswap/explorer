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
import Link from "next/link"

const { TextArea } = Input
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

function getChallengeDescriptionItems(
    datasetOverview: DatasetOverviewType,
    da: string
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Da",
            children: datasetOverview?.proofChallenge[da].da,
        },
        {
            key: "2",
            label: "ChallengeProof",
            children: datasetOverview?.proofChallenge[da].challenge,
        },
    ]
}
function getDescriptionItems(
    datasetOverview: DatasetOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Id",
            children: (
                <Link href={`/dataset/detail/${datasetOverview.id}`}>
                    {datasetOverview.id}
                </Link>
            ),
        },
        {
            key: "2",
            label: "Name",
            children: datasetOverview.name,
        },
        {
            key: "3",
            label: "Size",
            children: datasetOverview.size,
        },
        {
            key: "4",
            label: "Client",
            children: datasetOverview.submitter,
        },
    ]
}

export default () => {
    const [disputeList, setDisputeList] = useState<IDatasetDisputeTabel[]>()
    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()
    const router = useRouter()
    const [dispute, setDispute] = useState<DatasetDisputeType>()
    const { id, da } = router.query as { id: string; da: string }
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        const addDispute: DatasetDisputeType = {
            submitter: values.mockSubmitter,
            da: da,
            challenge: datasetOverview?.proofChallenge[da].challenge,
            disputeProof: values.disputeProof,
            result: "true",
        }

        const oldDisputes = datasetOverview?.disputes || {}

        const newDisputes = {
            ...oldDisputes,
            [addDispute.submitter]: addDispute,
        }

        axios
            .patch(`http://localhost:3001/datasetInfo/${id}`, {
                disputes: newDisputes,
            })
            .then(() => {
                const newChallengesArray = Object.values(
                    newDisputes
                ) as DatasetDisputeType[]

                id &&
                    setDisputeList(
                        getDatasetDisputeChallengeTabel(newChallengesArray)
                    )
                setDispute(addDispute)
            })
    }

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)

                const newDisputesArray =
                    res.data.disputes &&
                    (Object.values(res.data.disputes) as DatasetDisputeType[])
                newDisputesArray &&
                    setDisputeList(
                        getDatasetDisputeChallengeTabel(newDisputesArray)
                    )
            })
    }, [dispute])

    if (typeof id === "string" && id.trim() !== "") {
        return (
            <>
                <h2>Submit Dataset Dispute</h2>
                {datasetOverview && (
                    <>
                        <Descriptions
                            title="Dataset Info"
                            items={getDescriptionItems(datasetOverview)}
                        />
                        <Descriptions
                            title="Dataset Challenge Proof Info"
                            items={getChallengeDescriptionItems(
                                datasetOverview,
                                da
                            )}
                        />
                    </>
                )}
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Submit Dispute"></Form.Item>
                    <Form.Item
                        name="mockSubmitter"
                        label="Mock Submitter"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Please input mock Submitter address" />
                    </Form.Item>
                    <Form.Item
                        name="disputeProof"
                        label="Dispute Proof"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please input dataset dispute proof!",
                            },
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Please input dataset dispute proof"
                        />
                    </Form.Item>
                    <Form.Item label="Estimated dispute Fee">
                        <Form.Item name="daFee">
                            5
                            <span
                                className="ant-form-text"
                                style={{ marginLeft: 8 }}
                            >
                                FIL
                            </span>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>

                {disputeList && <DatasetDisputeTabel data={disputeList} />}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
