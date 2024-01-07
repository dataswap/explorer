import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import {
    getDataswapMessage,
    getVersion,
    getSyncStatus,
    getDatasetMetadata,
} from "../../shared/messagehub/get"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: // result,
InferGetServerSidePropsType<typeof getServerSideProps>) {
    useEffect(() => {
        getSyncStatus({ network: "calibration" }).then((res) =>
            console.log(res)
        )
        getDatasetMetadata({ network: "calibration" }).then((res) =>
            console.log(res)
        )
        getDataswapMessage({ network: "calibration" }).then((res) =>
            console.log(res)
        )
        getVersion().then((res) => console.log(res))
    }, [])
    return <div>message</div>
}
