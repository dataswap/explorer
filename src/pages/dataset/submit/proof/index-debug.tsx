import CreateDatasetProofForm from "@/components/form/dataset/proof"
import { DatasetProofCreateInfo } from "@dataswapjs/dataswapjs"

const initialValues: DatasetProofCreateInfo = {
    rootHash: "",
    leafHashesCount: 0,
    allProofsSubmitted: false,
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
