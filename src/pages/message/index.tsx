import React from "react"
import { NextPageContext } from "next"
import MessageBasicPage from "../messageBasic"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default () => {
    return <>{<MessageBasicPage data={{ network: "calibration" }} />}</>
}
