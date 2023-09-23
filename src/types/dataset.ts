export interface DatasetOverviewType {
    id: number
    name: string
    createdHeight: string
    createdTime: string
    size: string
    submitter: string
    state: string
    operate: string
    rootHash?: string
    completed?: string
    proofChallenge?: any
    disputes?: any
}

export interface DatasetProofType {
    hash: string
    cid: string
    size: string
}

export interface DatasetChallengeProofType {
    da: string
    challenge: string
    operate: string
}

export interface DatasetDisputeType {
    submitter: string
    da: string
    challenge: string
    disputeProof: string
    result: string
}
