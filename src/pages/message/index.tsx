import React from "react"
import MessageBasicPage from "../../components/table/service/message"
import { defaultTableQueryParams } from "../../config/params"
import { useSelector } from "react-redux"

export default () => {
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
                <h4>Message List</h4>
            </div>
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
