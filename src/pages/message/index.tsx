import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import {
    getDataswapMessage,
    getVersion,
    getSyncStatus,
    getDatasetMetadata,
} from "../../shared/messagehub/get"
import axios from "axios"

export async function getServerSideProps(context: NextPageContext) {
    // const result = await axios.get("http://localhost:3000/version")
    // console.log(result)

    return {
        props: {},
    }
}

export default function IndexPage({}: // result,
InferGetServerSidePropsType<typeof getServerSideProps>) {
    getSyncStatus({ network: "calibration" }).then((res) => console.log(res))
    // console.log(result)
    return <div>message</div>
}
