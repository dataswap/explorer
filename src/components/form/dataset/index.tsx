import React from "react"
import { Form as AntForm, Input, InputNumber, Select, Switch } from "antd"
import { Form, FormList, convertDataToFormFields } from "@dataswapjs/webutils"
import { DatasetCreateInfo } from "@dataswapjs/dataswapjs"

const { TextArea } = Input
const { Option } = Select

const overwriteFieldRules = {
    ownerCountry: {
        customComponent: (
            <Select placeholder="Please select dataset owner country">
                <Option value="country1">country1</Option>
                <Option value="country2">country2</Option>
            </Select>
        ),
    },
    requiredReplicasCountries: {
        customComponent: (
            <FormList
                name="requiredReplicasCountries"
                minLength={1}
                maxLength={10}
            />
        ),
    },
    dpFee: {
        customComponent: <InputNumber addonAfter="FIL" />,
    },
}

interface IProps {
    data: DatasetCreateInfo
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<DatasetCreateInfo>(
        data,
        overwriteFieldRules,
        {
            blacklist: ["isPublic", "description"],
            extra: [
                <AntForm.Item label="Is Public" key="isPublic_label">
                    <AntForm.Item
                        name="isPublic"
                        key="isPublic"
                        valuePropName="checked"
                    >
                        <Switch />
                    </AntForm.Item>
                </AntForm.Item>,
                <AntForm.Item
                    name="description"
                    key="description"
                    label="Description"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input dataset Description!",
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Please input dataset Description"
                    />
                </AntForm.Item>,
            ],
        }
    )

    return (
        <Form
            name="Create Dataset"
            fields={fields}
            onFinish={onFinish}
            initialValues={data}
        />
    )
}
