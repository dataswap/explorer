import React from "react"
import TableComponent, { generateColumns } from "@/components/tabel"

export interface IDatasetChallengeProofTabel {
    key: React.ReactNode
    da: string
    challenge: string
    operate: React.ReactNode
}

interface IProps {
    data: IDatasetChallengeProofTabel[]
}

export default ({ data }: IProps) => {
    const challengeProofColumns = generateColumns<IDatasetChallengeProofTabel>({
        da: "33.3%",
        challenge: "33.3%",
        operate: "33.3%",
    })
    return (
        <TableComponent<IDatasetChallengeProofTabel>
            columns={challengeProofColumns}
            data={data}
        />
    )
}
