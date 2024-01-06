import CreateDatasetForm from "@/components/form/dataset"
import { DatasetMetadata } from "@dataswapjs/dataswapjs"
import { ValueFields } from "@unipackage/utils"

const initialValues: ValueFields<DatasetMetadata> = {
    name: "name",
    description: "description",
    sizeInBytes: BigInt(0),
    industry: "industry",
    source: "source",
    accessMethod: "accessMethod",
    isPublic: true,
    title: "title",
    version: BigInt(1),
}

const onFinish = (values: any) => {
    console.log("Form111 values:", values)
}

export default () => {
    return (
        <CreateDatasetForm
            data={initialValues}
            onFinish={onFinish}
        ></CreateDatasetForm>
    )
}
