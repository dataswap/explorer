import React, { useEffect, useState } from "react"
import { InferGetServerSidePropsType, NextPageContext } from "next"
import axios from "axios"
import MatchingOverviewTabel from "@/components/tabel/matching/overview"
import { MatchingOverviewType } from "@dataswapjs/dataswap-sdk"
import { useRouter } from "next/router"

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    }
}

export default function IndexPage({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    const [list, setList] = useState<MatchingOverviewType[]>()
    const [closeAction, setCloseAction] = useState<boolean>()

    const router = useRouter()
    const handleClose = (id: number) => {
        axios(`http://localhost:3001/matchingsInfo/${id}`).then((res) => {
            const overview: any = res.data
            if (overview.bids) {
                axios
                    .patch(`http://localhost:3001/matchingsInfo/${id}`, {
                        state: "Complete",
                        operate: "",
                    })
                    .then((res) => {
                        const maxBidObj =
                            overview?.bids &&
                            Object.values(overview.bids).reduce(
                                (max: any, bidObj: any) => {
                                    const bid = parseFloat(bidObj.bid)
                                    if (bid > parseFloat(max.bid)) {
                                        return bidObj
                                    }
                                    return max
                                },
                                Object.values(overview.bids)[0]
                            )
                        axios
                            .patch(
                                `http://localhost:3001/matchingsInfo/${id}`,
                                {
                                    winner: maxBidObj,
                                }
                            )
                            .then(() => {
                                setCloseAction(!closeAction)
                            })
                    })
            } else {
                axios
                    .patch(`http://localhost:3001/matchingsInfo/${id}`, {
                        state: "Failed",
                        operate: "",
                    })
                    .then((res) => {
                        setCloseAction(!closeAction)
                    })
            }
        })
    }

    useEffect(() => {
        axios("http://localhost:3001/matchingsInfo").then((res) => {
            const overiews: MatchingOverviewType[] = res.data
            setList(overiews)
        })
    }, [closeAction])

    // const onClick = () => {
    //     router.push("/dataset/submit/dataset")
    // }
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
                {/* <div style={{ marginLeft: "auto" }}>
                    <Button type="text" htmlType="button" onClick={onClick}>
                        <PlusOutlined style={{ color: "black" }} />
                        Create Dataset
                    </Button>
                </div> */}
            </div>

            {list && (
                <MatchingOverviewTabel data={list} handleClose={handleClose} />
            )}
        </>
    )
}
