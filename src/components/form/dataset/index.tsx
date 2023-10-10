import React from "react"
import { Input } from "antd"
import { Form, FormList, convertDataToFormFields } from "@dataswapjs/webutils"
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
    isPublic: "Yes",
    replicasRequiredNumber: "100",
    replicasCountries: [],
}

const customFieldRules = {
    replicasCountries: {
        customComponent: (
            <FormList
                name="replicasCountries"
                renderField={(field) => (
                    <Input
                        placeholder="country name"
                        style={{ width: "60%" }}
                    />
                )}
                minLength={1}
                maxLength={10}
            />
        ),
    },
}

const fields = convertDataToFormFields<DatasetCreateInfo>(
    initialValues,
    customFieldRules
    // {
    //     blacklist: ["replicasCountries"],
    //     extra: [
    //         {
    //             name: "replicasCountries",
    //             label: "test222",
    //             customComponent: (
    //                 <FormList
    //                     name="replicasCountries"
    //                     renderField={(field) => {
    //                         return (
    //                             <Input
    //                                 placeholder="country name"
    //                                 style={{ width: "60%" }}
    //                             />
    //                         )
    //                     }}
    //                     minLength={1}
    //                     maxLength={10}
    //                 />
    //             ),
    //         },
    //     ],
    // }
)

export default () => {
    const onFinish = (values: any) => {
        console.log("Form values:", values)
    }

    return (
        <Form
            name="Create Dataset"
            fields={fields}
            onFinish={onFinish}
            initialValues={initialValues}
        />
    )
}
