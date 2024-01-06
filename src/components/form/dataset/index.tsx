import React from "react"
import { Form as AntForm, Input, InputNumber, Select, Switch } from "antd"
import { Form, FormList, convertDataToFormFields } from "@unipackage/webkit"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import { ValueFields } from "@unipackage/utils"

const { TextArea } = Input
const { Option } = Select

const overwriteFieldRules = {
    /*
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
    */
}

interface IProps {
    data: ValueFields<DatasetMetadata>
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<ValueFields<DatasetMetadata>>(
        data,
        overwriteFieldRules,
        {
            blacklist: [
                "isPublic",
                "description",
                "submitter",
                "createdBlockNumber",
                "datasetId",
                "status",
                "id",
            ],
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
