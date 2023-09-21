import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

interface IProps {
    id: number
}
export default function IndexPage(
    { id }: IProps,
    {}: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return <div>Dataset{id}:dispute detail</div>
}
