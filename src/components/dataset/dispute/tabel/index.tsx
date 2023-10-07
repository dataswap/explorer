import React from "react"
import TableComponent, { generateColumns } from "@/components/tabel"

export interface IDatasetDisputeTabel {
    key: React.ReactNode
    submitter: string
    da: string
    challenge: string
    disputeProof: string
    result: string
}

interface IProps {
    data: IDatasetDisputeTabel[]
}

export default ({ data }: IProps) => {
    const challengeProofColumns = generateColumns<IDatasetDisputeTabel>({
        submitter: "20%",
        da: "20%",
        challenge: "20%",
        disputeProof: "20%",
        result: "20%",
    })
    return (
        <TableComponent<IDatasetDisputeTabel>
            columns={challengeProofColumns}
            data={data}
        />
    )
}
