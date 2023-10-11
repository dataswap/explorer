import CreateDatasetForm from "@/components/form/dataset"
import { DatasetCreateInfo } from "@dataswapjs/dataswap-sdk"

const initialValues: DatasetCreateInfo = {
    name: "name",
    description: "description",
    size: "size",
    industry: "industry",
    source: "source",
    accessMethod: "accessMethod",
    version: "version",
    ownername: "ownername",
    ownercountry: "ownercountry",
    ownerwebsite: "ownerwebsite",
    isPublic: true,
    replicasRequiredNumber: "100",
    dpFee: 10,
    replicasCountries: [],
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
