import CreateDatasetDisputeForm from "@/components/form/dataset/dispute"
import { DatasetDisputeCreateInfo } from "@dataswapjs/dataswap-sdk"

const initialValues: DatasetDisputeCreateInfo = {
    mockSubmitter: "",
    mockResult: false,
    disputeProof: "",
}

const onFinish = (values: any) => {
    console.log("Form111 values:", values)
}

export default () => {
    return (
        <CreateDatasetDisputeForm
            data={initialValues}
            onFinish={onFinish}
        ></CreateDatasetDisputeForm>
    )
}
