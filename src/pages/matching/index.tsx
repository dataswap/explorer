import React from "react"
import MatchingBasicTable from "../../components/table/service/matchingMetadata"
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
