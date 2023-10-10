import React, { useEffect, useState } from "react"
import { Button, Form, Input, Select } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import {
    DatasetOverviewType,
    DatasetDisputeType,
} from "@dataswapjs/dataswap-sdk"
import DatasetDisputeTabel from "@/components/tabel/dataset/dispute"
import { DatasetOverviewDescription } from "@/components/description/dataset"
import { DatasetChallengeDescription } from "@/components/description/dataset/challenge"

const { Option } = Select
const { TextArea } = Input
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

export default () => {
    const [disputeList, setDisputeList] = useState<DatasetDisputeType[]>()
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
            result: values.result,
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

                id && setDisputeList(newChallengesArray)
                setDispute(addDispute)
            })
            .then(() => {
                router.push(`http://localhost:3000/dataset/detail/${id}`)
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
                newDisputesArray && setDisputeList(newDisputesArray)
            })
    }, [dispute])

    if (typeof id === "string" && id.trim() !== "") {
        return (
            <>
                <h2>Submit Dataset Dispute</h2>
                {datasetOverview && (
                    <>
                        <DatasetOverviewDescription data={datasetOverview} />
                        <DatasetChallengeDescription
                            data={datasetOverview}
                            da={da}
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
                    <Form.Item
                        name="result"
                        label="Mock Result"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="invalid">Invalid</Option>
                            <Option value="valid">Valid</Option>
                        </Select>
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
