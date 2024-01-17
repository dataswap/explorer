import React from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import MatchingBasicTable from "../basic/table/matchingMetadata"
import { defaultTableQueryParams } from "../../config/params"
import { useSelector } from "react-redux"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )
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
                        network,
                        queryFilter: {
                            ...defaultTableQueryParams,
                        },
                    }}
                />
            }
        </>
    )
}
