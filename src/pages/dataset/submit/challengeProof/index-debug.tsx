import CreateDatasetChallengeForm from "@/components/form/dataset/challenge"
import { DatasetChallengeCreateInfo } from "@dataswapjs/dataswapjs"

const initialValues: DatasetChallengeCreateInfo = {
    mockDa: "",
    challenge: "",
    estimatedDaFee: 0,
}

const onFinish = (values: any) => {
    console.log("Form111 values:", values)
}

export default () => {
    return (
        <CreateDatasetChallengeForm
            data={initialValues}
            onFinish={onFinish}
        ></CreateDatasetChallengeForm>
    )
}
