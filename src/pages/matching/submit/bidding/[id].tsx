import React, { useEffect, useState } from "react"
import type { DescriptionsProps } from "antd"
import { Descriptions, Button, Form, Input, Select, InputNumber } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import { MatchingOverviewType, MatchingBidType } from "@dataswapjs/dataswapjs"

import { MatchingOverviewDescription } from "@/components/description/matching/index"

const { TextArea } = Input
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
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
    const [list, setList] = useState<MatchingBidType[]>()

    const [overview, setOverview] = useState<MatchingOverviewType>()
    const [bid, setBid] = useState<MatchingBidType>()
    const router = useRouter()
    const { id } = router.query
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log(values)
        const addBid: MatchingBidType = {
            bidder: values.bidder,
            bid: values.bid,
            bidTime: formatCurrentDateTime(),
        }

        const oldBids = overview?.bids || {}

        const newBids = {
            ...oldBids,
            [addBid.bidder]: addBid,
        }
        axios
            .patch(`http://localhost:3001/matchingsInfo/${id}`, {
                bids: newBids,
            })
            .then(() => {
                const newBidsArray = Object.values(newBids) as MatchingBidType[]
                id && setList(newBidsArray)
                setBid(addBid)
            })
    }

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/matchingsInfo/${id}`).then((res) => {
                setOverview(res.data)
                res.data.bids
                    ? setList(Object.values(res.data.bids))
                    : setList([])
            })
    }, [bid])

    if (typeof id === "string" && id.trim() !== "") {
        return (
            <>
                <h2>Bidding</h2>
                {overview && <MatchingOverviewDescription data={overview} />}
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Bidding"></Form.Item>
                    <Form.Item
                        name="bidder"
                        label="Mock Bidder"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Please input mock Bidder address" />
                    </Form.Item>
                    <Form.Item label="Bid" name="bid">
                        <Form.Item>
                            <InputNumber />
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
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
