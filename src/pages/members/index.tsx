import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    return <div>members</div>
}
