import React from "react"
import { InputNumber, Select } from "antd"
import { Form, convertDataToFormFields } from "@unipackage/webkit"
import { MatchingMetadata } from "@dataswapjs/dataswapjs"
import { ValueFields } from "@unipackage/utils"

const { Option } = Select

const overwriteFieldRules = {
    biddingThreshold: {
        customComponent: <InputNumber addonAfter="FIL" />,
    },
    biddingDelayBlockCount: {
        customComponent: <InputNumber addonAfter="Blocks" />,
    },
    biddingPeriodBlockCount: {
        customComponent: <InputNumber addonAfter="Blocks" />,
    },
    storageCompletionPeriodBlocks: {
        customComponent: <InputNumber addonAfter="Blocks" />,
    },
    bidSelectionRule: {
        customComponent: (
            <Select placeholder="Select a option " allowClear>
                <Option value="0">HighestBid</Option>
                <Option value="1">LowestBid</Option>
                <Option value="2">LowestBid</Option>
                <Option value="3">LowestBid</Option>
            </Select>
        ),
    },
}

interface IProps {
    data: ValueFields<MatchingMetadata>
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<ValueFields<MatchingMetadata>>(
        data,
        overwriteFieldRules,
        {
            blacklist: [
                "id",
                "datasetId",
                "createdBlockNumber",
                "initiator",
                "pausedBlockCount",
                "matchingId",
                "replicaIndex",
            ],
        }
    )

    return (
        <Form
            name="Create Matching"
            fields={fields}
            onFinish={onFinish}
            initialValues={data}
        />
    )
}
