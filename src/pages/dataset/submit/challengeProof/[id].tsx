import React, { useEffect, useState } from "react"
import type { DescriptionsProps } from "antd"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import { DatasetOverviewType, DatasetChallengeProofType } from "@/types/dataset"
import DatasetChallengeTabel, {
    IDatasetChallengeProofTabel,
} from "@/components/dataset/challenge/tabel"
import { getDatasetProofChallengeTabel } from "@/components/dataset/challenge/tabel/utils"
import Link from "next/link"

const { TextArea } = Input
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
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
    const [challengeList, setChallengeList] =
        useState<IDatasetChallengeProofTabel[]>()
    const [challenge, setChallenge] = useState<DatasetChallengeProofType>()

    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()
    const [complete, setComplete] = useState<boolean>()
    const router = useRouter()
    const { id } = router.query
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        const addChallenge: DatasetChallengeProofType = {
            da: values.mockDA,
            challenge: values.challengeProof,
            operate: "dispute",
        }

        const oldChallenges = datasetOverview?.proofChallenge || {}

        const newChallenges = {
            ...oldChallenges,
            [addChallenge.da]: addChallenge,
        }

        axios
            .patch(`http://localhost:3001/datasetInfo/${id}`, {
                proofChallenge: newChallenges,
            })
            .then(() => {
                axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                    const newChallengesArray = Object.values(
                        newChallenges
                    ) as DatasetChallengeProofType[]

                    id &&
                        setChallengeList(
                            getDatasetProofChallengeTabel(
                                newChallengesArray,
                                res.data,
                                Number(id)
                            )
                        )
                    setChallenge(addChallenge)

                    if (newChallengesArray.length >= 3) {
                        axios
                            .patch(`http://localhost:3001/datasetInfo/${id}`, {
                                proofChallengeCompleted: true,
                            })
                            .then(() => {
                                setComplete(true)
                                axios.patch(
                                    `http://localhost:3001/datasetInfo/${id}`,
                                    {
                                        state: "DisputeInitiationPeriod",
                                        operate: "",
                                    }
                                )
                            })
                    }
                    router.push(`http://localhost:3000/dataset/detail/${id}`)
                })
            })
    }

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)
                setComplete(res.data.proofChallengeCompleted)
                const newChallengesArray =
                    res.data.proofChallenge &&
                    (Object.values(
                        res.data.proofChallenge
                    ) as DatasetChallengeProofType[])

                id &&
                    setChallengeList(
                        getDatasetProofChallengeTabel(
                            newChallengesArray,
                            res.data,
                            Number(id)
                        )
                    )
            })
    }, [challenge])

    if (typeof id === "string" && id.trim() !== "") {
        return (
            <>
                <h2>Submit Dataset Challenge Proof</h2>
                {datasetOverview && (
                    <Descriptions
                        title="Dataset Info"
                        items={getDescriptionItems(datasetOverview)}
                    />
                )}
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Submit Challenge Proof"></Form.Item>
                    <Form.Item
                        name="mockDA"
                        label="Mock DA"
                        rules={[{ required: true }]}
                    >
                        <Input
                            placeholder="Please input mock DA address"
                            disabled={complete}
                        />
                    </Form.Item>
                    <Form.Item
                        name="challengeProof"
                        label="Challenge Proof"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input dataset challenge proof!",
                            },
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Please input dataset challenge proof"
                            disabled={complete}
                        />
                    </Form.Item>
                    <Form.Item label="Estimated DA Fee">
                        <Form.Item name="daFee">
                            10
                            <span
                                className="ant-form-text"
                                style={{ marginLeft: 8 }}
                            >
                                FIL
                            </span>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={complete}
                        >
                            Submit
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={onReset}
                            disabled={complete}
                        >
                            Reset
                        </Button>
                    </Form.Item>
                </Form>

                {challengeList && (
                    <DatasetChallengeTabel data={challengeList} />
                )}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
