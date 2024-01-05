import CreateMatchingBidForm from "@/components/form/matching/bid"
import { MatchingBidCreateInfo } from "@dataswapjs/dataswapjs"

const initialValues: MatchingBidCreateInfo = {
    mockBidder: "",
    bid: 0,
}

const onFinish = (values: any) => {
    console.log("Form111 values:", values)
}

export default () => {
    return (
        <CreateMatchingBidForm
            data={initialValues}
            onFinish={onFinish}
        ></CreateMatchingBidForm>
    )
}
