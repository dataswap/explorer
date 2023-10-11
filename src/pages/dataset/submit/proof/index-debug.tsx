import CreateDatasetProofForm from "@/components/form/dataset/proof"
import { DatasetProofCreateInfo } from "@dataswapjs/dataswap-sdk"

const initialValues: DatasetProofCreateInfo = {
    rootHash: "",
    leafHashesCount: 0,
    completed: false,
}

const onFinish = (values: any) => {
    console.log("Form111 values:", values)
}

export default () => {
    return (
        <CreateDatasetProofForm
            data={initialValues}
            onFinish={onFinish}
        ></CreateDatasetProofForm>
    )
}