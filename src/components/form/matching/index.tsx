import React from "react"
import { InputNumber, Select, DatePicker } from "antd"
import { Form, convertDataToFormFields } from "@dataswapjs/webutils"
import { MatchingCreateInfo } from "@dataswapjs/dataswap-sdk"

const { Option } = Select
const { RangePicker } = DatePicker

const overwriteFieldRules = {
    auctionPeriod: {
        customComponent: <RangePicker format="YYYY/MM/DD" />,
    },
    biddingThreshold: {
        customComponent: <InputNumber addonAfter="FIL" />,
    },
    storageCompletePeriod: {
        customComponent: <InputNumber addonAfter="Days" />,
    },
    storageLifecycle: {
        customComponent: <InputNumber addonAfter="Days" />,
    },
    dataTransferType: {
        customComponent: (
            <Select placeholder="Select a option " allowClear>
                <Option value="online">online</Option>
                <Option value="offline">offline</Option>
            </Select>
        ),
    },
}

interface IProps {
    data: MatchingCreateInfo
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<MatchingCreateInfo>(
        data,
        overwriteFieldRules
    )

    return (
        <Form
            name="Create Matching"
            fields={fields}
            onFinish={onFinish}
            initialValues={data}
        />
    )
}
