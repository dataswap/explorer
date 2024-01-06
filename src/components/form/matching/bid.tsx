import React from "react"
import { InputNumber } from "antd"
import { Form, convertDataToFormFields } from "@unipackage/webkit"

//TODO: create this type in dataswapjs
export interface MatchingBid {
    bidder: string
    amount: bigint
}

const overwriteFieldRules = {
    amount: {
        customComponent: <InputNumber addonAfter="FIL" />,
    },
}

interface IProps {
    data: MatchingBid
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<MatchingBid>(
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
