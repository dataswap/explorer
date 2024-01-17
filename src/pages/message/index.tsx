import React from "react"
import { NextPageContext } from "next"
import MessageBasicPage from "../basic/table/message"
import { defaultTableQueryParams } from "../../config/params"
import { useSelector } from "react-redux"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default () => {
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )
    return (
        <>
            {
                <MessageBasicPage
                    queryParam={{
                        network,
                        queryFilter: {
                            ...defaultTableQueryParams,
                            sort: [{ field: "height", order: "desc" }],
                        },
                    }}
                />
            }
        </>
    )
}
