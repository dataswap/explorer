import React from "react"
import { NextPageContext } from "next"
import MessageBasicPage from "../basic/tabel/message"
import { defaultTableQueryParams } from "../../config/params"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default () => {
    return (
        <>
            {
                <MessageBasicPage
                    queryParam={{
                        network: "calibration",
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
