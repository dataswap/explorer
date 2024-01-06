import CreateMatchingBidForm from "@/components/form/matching/bid"
import { MatchingBid } from "@/shared/types"
import { useRouter } from "next/router"

const initialValues: MatchingBid = {} as MatchingBid

const onFinish = (values: any) => {
    console.log("Form111 values:", values)
}
//TODO, check matching id

export default () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <CreateMatchingBidForm
            data={initialValues}
            onFinish={onFinish}
        ></CreateMatchingBidForm>
    )
}
