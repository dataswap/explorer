import {
    DatasetOverviewType,
    DatasetDisputeType,
} from "@dataswapjs/dataswap-sdk"
import { getReplicasDescriptionItems } from "@/components/dataset/utils"
import { DatasetOverviewDescription } from "@/components/description/dataset"
import {
    Descriptions,
    Button,
    Form,
    InputNumber,
    DatePicker,
    Input,
    Select,
    Space,
} from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import { useEffect, useState } from "react"

const { RangePicker } = DatePicker
const { Option } = Select

const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 14 },
}

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
}

function formatCurrentDateTime(): string {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const day = String(currentDate.getDate()).padStart(2, "0")
    const hours = String(currentDate.getHours()).padStart(2, "0")
    const minutes = String(currentDate.getMinutes()).padStart(2, "0")
    const seconds = String(currentDate.getSeconds()).padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default () => {
    const router = useRouter()
    const { datasetId, replicaId } = router.query as {
        datasetId: string
        replicaId: string
    }

    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()

    const onFinish = (values: any) => {
        axios
            .post("http://localhost:3001/matchingsInfo", {
                ...values,
                datasetId: datasetId,
                replicaId: replicaId,
                size: datasetOverview?.size,
                createdTime: formatCurrentDateTime(),
                state: "Matching",
                operate: "bidding",
            })
            .then((res) => {
                router.push(
                    `http://localhost:3000/matching/detail/${res.data.id}`
                )
            })
    }

    useEffect(() => {
        datasetId &&
            axios(`http://localhost:3001/datasetInfo/${datasetId}`).then(
                (res) => {
                    setDatasetOverview(res.data)
                }
            )
    }, [])
    return (
        <>
            <h2>Create matching</h2>
            {datasetOverview && (
                <DatasetOverviewDescription data={datasetOverview} />
            )}
            {datasetOverview && (
                <Descriptions
                    title="Replica Info"
                    items={getReplicasDescriptionItems(
                        datasetOverview,
                        Number(replicaId)
                    )}
                />
            )}
            <Form
                name="create matching"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    initialPrice: 10,
                    storageCompletePeriod: 30,
                    storageLifecycle: 540,
                    dataTransferType: "online",
                    datalocation: "country1111",
                    dpBandwidthSpeed: "10Gbps",
                    spLocation: "country222",
                    spBandwidthSpeed: "10Gbps",
                }}
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Create Matching"></Form.Item>
                <Form.Item
                    name="submitter"
                    label="Mock Submitter"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input mock submitter!",
                        },
                    ]}
                >
                    <Input placeholder="Please input mock submitter" />
                </Form.Item>

                <Form.Item label="auction period" name="auctionPeriod">
                    <RangePicker />
                </Form.Item>

                <Form.Item label="Initial Price(FIL)">
                    <Form.Item name="initialPrice">
                        <InputNumber />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Storage complete period(Days)">
                    <Form.Item name="storageCompletePeriod">
                        <InputNumber />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Storage lifecycle(Days)">
                    <Form.Item name="storageLifecycle">
                        <InputNumber />
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    name="dataTransferType"
                    label="Data transfer type"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please select data transfer type!",
                        },
                    ]}
                >
                    <Select placeholder="Please select data transfer type!">
                        <Option value="online">online</Option>
                        <Option value="offline">offline</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="datalocation"
                    label="Data Location(country)"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input data location!",
                        },
                    ]}
                >
                    <Input placeholder="Please input data location" />
                </Form.Item>

                <Form.Item
                    name="dpBandwidthSpeed"
                    label="DP Bandwidth Speed"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input DP bandwidth speed!",
                        },
                    ]}
                >
                    <Input placeholder="Please input DP bandwidth speed!" />
                </Form.Item>

                <Form.Item
                    name="spLocation"
                    label="SP Location(country)"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input sp location!",
                        },
                    ]}
                >
                    <Input placeholder="Please input sp location" />
                </Form.Item>

                <Form.Item
                    name="spBandwidthSpeed"
                    label="SP Bandwidth Speed"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input SP bandwidth speed!",
                        },
                    ]}
                >
                    <Input placeholder="Please input SP bandwidth speed!" />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="reset">reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}
