import React from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import MatchingBasicTable from "../basic/tabel/matchingMetadata"
import { defaultTableQueryParams } from "../../config/params"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h4>Matching List</h4>
            </div>
            {
                <MatchingBasicTable
                    queryParam={{
                        network: "calibration",
                        queryFilter: { ...defaultTableQueryParams },
                    }}
                />
            }
        </>
    )
}
