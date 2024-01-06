import CreateMatchingForm from "@/components/form/matching"
import { MatchingMetadata } from "@dataswapjs/dataswapjs"

const initialValues: MatchingMetadata = {} as MatchingMetadata

const onFinish = (values: any) => {
    console.log("Form111 values:", values)
}

export default () => {
    return (
        <CreateMatchingForm
            data={initialValues}
            onFinish={onFinish}
        ></CreateMatchingForm>
    )
}
