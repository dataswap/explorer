import React from "react"

export interface DatasetOverviewTabelItem {
    key: React.ReactNode
    id: React.ReactNode
    name: React.ReactNode
    createdHeight: string
    createdTime: string
    size: string
    submitter: string
    state: string
    operate: React.ReactNode
}

export interface DatasetProofTabelItem {
    key: React.ReactNode
    hash: string
    cid: string
    size: string
}

export interface DatasetChallengeTabelItem {
    key: React.ReactNode
    da: string
    challenge: string
    operate: React.ReactNode
}

export interface DatasetDisputeTabelItem {
    key: React.ReactNode
    submitter: string
    da: string
    challenge: string
    disputeProof: string
    result: string
}

export interface DatasetReplicasTabelItem {
    key: React.ReactNode
    id: string
    country: string
    dp: string
    state: string
    operate: React.ReactNode
}
