import React from "react"
import { InputNumber } from "antd"
import { Form, convertDataToFormFields } from "@dataswapjs/webutils"
import { DatasetChallengeCreateInfo } from "@dataswapjs/dataswapjs"

const overwriteFieldRules = {
    estimatedDaFee: {
        customComponent: <InputNumber addonAfter="FIL" />,
    },
}

interface IProps {
    data: DatasetChallengeCreateInfo
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<DatasetChallengeCreateInfo>(
        data,
        overwriteFieldRules
    )

    return (
        <Form
            name="Create Dataset Challenge"
            fields={fields}
            onFinish={onFinish}
            initialValues={data}
        />
    )
}
