import CreateMatchingForm from "@/components/form/matching"
import { MatchingCreateInfo } from "@dataswapjs/dataswap-sdk"
import dayjs from "dayjs"

const initialValues: MatchingCreateInfo = {
    mockSubmitter: "",
    auctionPeriod: [dayjs("2023/10/01"), dayjs("2023/10/10")],
    biddingThreshold: 0,
    storageCompletePeriod: 0,
    storageLifecycle: 0,
    dataTransferType: "online",
    datalocation: "",
    dpBandwidthSpeed: "",
    spLocation: "",
    spBandwidthSpeed: "",
}

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
