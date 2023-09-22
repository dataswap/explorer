import { Button, Form, InputNumber, Input, Select, Space, Switch } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import axios from "axios"
import { date } from "zod"

const { Option } = Select
const { TextArea } = Input

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

const onFinish = (values: any) => {
    axios.post("http://localhost:3001/datasetInfo", {
        ...values,
        createdTime: formatCurrentDateTime(),
        createdHeight: "9999",
        submitter: "0x00000000000000000000",
        state: "MetadataSubmitted",
        operate: "proof",
    })
    // axios.patch("http://localhost:3001/datasetInfo/4", {
    //     state: "xxxx",
    // })
}

export default () => (
    <Form
        name="create dataset"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
            description: "description_example",
            industry: "description_example",
            source: "source_example",
            accessMethod: "accessMethod_example",
            version: "version_example",
            ownername: "ownername_example",
            ownercountry: "country1",
            ownerwebsite: "ownerwebsite_example",
            replicasRequiredNumber: 10,
            replicasCountries: ["country1", "country2"],
            isPublic: true,
        }}
        style={{ maxWidth: 600 }}
    >
        <Form.Item label="Create Dataset"></Form.Item>
        <Form.Item
            name="name"
            label="Name"
            hasFeedback
            rules={[{ required: true, message: "Please input dataset name!" }]}
        >
            <Input placeholder="Please input dataset name" />
        </Form.Item>

        <Form.Item
            name="description"
            label="Description"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: "Please input dataset Description!",
                },
            ]}
        >
            <TextArea rows={4} placeholder="Please input dataset Description" />
        </Form.Item>

        <Form.Item
            name="size"
            label="Size"
            hasFeedback
            rules={[{ required: true, message: "Please input dataset size!" }]}
        >
            <Input placeholder="Please input dataset size" />
        </Form.Item>

        <Form.Item
            name="industry"
            label="Industry"
            hasFeedback
            rules={[
                { required: true, message: "Please input dataset industry!" },
            ]}
        >
            <Input placeholder="Please input dataset industry" />
        </Form.Item>

        <Form.Item
            name="source"
            label="Source"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: "Please input dataset source!",
                },
            ]}
        >
            <Input placeholder="Please input dataset source" />
        </Form.Item>

        <Form.Item
            name="accessMethod"
            label="Access Method"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: "Please input dataset accessMethod!",
                },
            ]}
        >
            <Input placeholder="Please input dataset accessMethod" />
        </Form.Item>

        <Form.Item
            name="version"
            label="Version"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: "Please input dataset version!",
                },
            ]}
        >
            <Input placeholder="Please input dataset version" />
        </Form.Item>

        <Form.Item
            name="ownername"
            label="Owner name"
            hasFeedback
            rules={[
                { required: true, message: "Please input dataset owner name!" },
            ]}
        >
            <Input placeholder="Please input dataset owner name" />
        </Form.Item>

        <Form.Item
            name="ownercountry"
            label="Owner country"
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
        >
            <Select placeholder="Please select dataset owner country">
                <Option value="country1">country1</Option>
                <Option value="country2">country2</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="ownerwebsite"
            label="Owner website"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: "Please input dataset owner website!",
                },
            ]}
        >
            <Input placeholder="Please input dataset owner website" />
        </Form.Item>

        <Form.Item label="Replicas Required(1~10)">
            <Form.Item name="replicasRequiredNumber">
                <InputNumber min={1} max={10} />
            </Form.Item>
        </Form.Item>

        <Form.Item label="Replicas Country Required(1~10)">
            <Form.List
                name="replicasCountries"
                rules={[
                    {
                        validator: async (_, names) => {
                            if (
                                !names ||
                                names.length < 1 ||
                                names.length > 10
                            ) {
                                return Promise.reject(
                                    new Error(
                                        "At Least 1 counntries and At Most 10 counntries"
                                    )
                                )
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0
                                    ? formItemLayoutWithOutLabel
                                    : formItemLayoutWithOutLabel)}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={["onChange", "onBlur"]}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message:
                                                "Please input countries's name or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="country name"
                                        style={{ width: "60%" }}
                                    />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: "60%" }}
                                icon={<PlusOutlined />}
                            >
                                Add country
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form.Item>

        <Form.Item name="isPublic" label="Is public" valuePropName="checked">
            <Switch />
        </Form.Item>

        <Form.Item label="DP Fee">
            <Form.Item name="dpFee">
                <InputNumber />
                <span className="ant-form-text" style={{ marginLeft: 8 }}>
                    FIL
                </span>
            </Form.Item>
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
)
