import React from "react"
import { InputNumber } from "antd"
import { Form, convertDataToFormFields } from "@dataswapjs/webutils"
import { MatchingBidCreateInfo } from "@dataswapjs/dataswap-sdk"

const overwriteFieldRules = {
    bid: {
        customComponent: <InputNumber addonAfter="FIL" />,
    },
}

interface IProps {
    data: MatchingBidCreateInfo
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<MatchingBidCreateInfo>(
        data,
        overwriteFieldRules
    )

    return (
        <Form
            name="Create Bid"
            fields={fields}
            onFinish={onFinish}
            initialValues={data}
        />
    )
}
