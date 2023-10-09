import React, { useEffect, useState } from "react"
import { InboxOutlined } from "@ant-design/icons"
import type { UploadProps, DescriptionsProps } from "antd"
import {
    message,
    Upload,
    Descriptions,
    Button,
    Form,
    Input,
    Select,
} from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import DatasetProofTabel from "@/components/tabel/dataset/proof"
import { DatasetOverviewType, DatasetProofType } from "@dataswapjs/dataswap-sdk"
import Link from "next/link"

const { Dragger } = Upload
const { Option } = Select
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

function getDescriptionItems(
    datasetOverview: DatasetOverviewType
): DescriptionsProps["items"] {
    return [
        {
            key: "1",
            label: "Id",
            children: (
                <Link href={`/dataset/detail/${datasetOverview.id}`}>
                    {datasetOverview.id}
                </Link>
            ),
        },
        {
            key: "2",
            label: "Name",
            children: datasetOverview.name,
        },
        {
            key: "3",
            label: "Size",
            children: datasetOverview.size,
        },
        {
            key: "4",
            label: "Client",
            children: datasetOverview.submitter,
        },
    ]
}
function getProps(id: string, setProofList: any): UploadProps {
    return {
        name: "file",
        action: "http://localhost:8888",
        id: id,
        onChange(info) {
            const { status } = info.file
            if (status !== "uploading") {
                console.log(info.file, info.fileList)
            }
            if (status === "done") {
                //read new proof file
                axios("http://localhost:3000/proof.json").then((res) => {
                    const newProofs = res.data.proofs
                    //read old proof params
                    axios(`http://localhost:3001/datasetInfo/${id}`).then(
                        (res) => {
                            const oldProofs = res.data.proofs
                            const updateProofs = { ...oldProofs, ...newProofs }
                            //patch new proof params to the proofs
                            axios
                                .patch(
                                    `http://localhost:3001/datasetInfo/${id}`,
                                    {
                                        proofs: updateProofs,
                                    }
                                )
                                .then(() => {
                                    setProofList(
                                        Object.keys(updateProofs).map(
                                            (key) => ({
                                                key: key,
                                                hash: key,
                                                ...updateProofs[key],
                                            })
                                        )
                                    )
                                })

                            message.success(
                                `${info.file.name} file uploaded successfully.`
                            )
                        }
                    )
                })
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files)
        },
    }
}

export default () => {
    const [proofList, setProofList] = useState<DatasetProofType[]>()
    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()
    const router = useRouter()
    const { id } = router.query
    const [form] = Form.useForm()

    const onCompletedChange = (value: string) => {
        switch (value) {
            case "no":
                form.setFieldsValue({ note: "submit not completed!" })
                break
            case "yes":
                form.setFieldsValue({ note: "submit completed!" })
                axios.patch(`http://localhost:3001/datasetInfo/${id}`, {
                    state: "DatasetProofSubmitted",
                    operate: "challengeProof",
                })
                break
            default:
        }
    }

    const onFinish = (values: any) => {
        axios
            .patch(`http://localhost:3001/datasetInfo/${id}`, {
                rootHash: values.rootHash,
                completed: values.completed,
            })
            .then(() => {
                router.push(`http://localhost:3000/dataset/detail/${id}`)
            })
    }

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                const oldProofs = res.data.proofs
                setDatasetOverview(res.data)
                oldProofs &&
                    setProofList(
                        Object.keys(oldProofs).map((key) => ({
                            key: key,
                            hash: key,
                            ...oldProofs[key],
                        }))
                    )

                if (res.data.completed) {
                    form.setFieldsValue({ completed: res.data.completed })
                }
                if (res.data.rootHash) {
                    form.setFieldsValue({ rootHash: res.data.rootHash })
                }
            })
    }, [])

    if (typeof id === "string" && id.trim() !== "") {
        return (
            <>
                <h2>Submit Dataset Proof</h2>
                {datasetOverview && (
                    <Descriptions
                        title="Dataset Info"
                        items={getDescriptionItems(datasetOverview)}
                    />
                )}
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Submit Proof"></Form.Item>
                    <Form.Item
                        name="rootHash"
                        label="Root Hash"
                        rules={[{ required: true }]}
                    >
                        <Input
                            disabled={
                                datasetOverview?.rootHash != undefined &&
                                datasetOverview?.rootHash != ""
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="completed"
                        label="Completed"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={onCompletedChange}
                            allowClear
                            disabled={datasetOverview?.completed == "yes"}
                        >
                            <Option value="no">No</Option>
                            <Option value="yes">Yes</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues.gender !== currentValues.gender
                        }
                    >
                        {({ getFieldValue }) =>
                            getFieldValue("gender") === "other" ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={datasetOverview?.completed == "yes"}
                        >
                            Submit
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={onReset}
                            disabled={datasetOverview?.completed == "yes"}
                        >
                            Reset
                        </Button>
                    </Form.Item>
                </Form>

                <Dragger
                    {...getProps(id, setProofList)}
                    disabled={datasetOverview?.completed == "yes"}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                </Dragger>

                {proofList && <DatasetProofTabel data={proofList} />}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
