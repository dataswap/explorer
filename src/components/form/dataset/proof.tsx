import React from "react"
import { InputNumber, Select } from "antd"
import { Form, convertDataToFormFields } from "@dataswapjs/webutils"
import { DatasetProofCreateInfo } from "@dataswapjs/dataswap-sdk"

const { Option } = Select

const overwriteFieldRules = {
    leafHashesCount: {
        customComponent: <InputNumber />,
    },
    allProofsSubmitted: {
        customComponent: (
            <Select placeholder="Select a option " allowClear>
                <Option value={false}>No</Option>
                <Option value={true}>Yes</Option>
            </Select>
        ),
    },
}

interface IProps {
    data: DatasetProofCreateInfo
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<DatasetProofCreateInfo>(
        data,
        overwriteFieldRules
    )

    return (
        <Form
            name="Create Dataset Proof"
            fields={fields}
            onFinish={onFinish}
            initialValues={data}
        />
    )
}
