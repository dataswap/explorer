import { Tabs } from "antd"
import type { TabsProps } from "antd"
import ChallengeDetail from "@/pages/dataset/detail/challengeProof"
import ProofDetail from "@/pages/dataset/detail/proof"
import DisputeDetail from "@/pages/dataset/detail/dispute"
import { useRouter } from "next/router"

const onChange = (key: string) => {
    console.log(key)
}

function getItems(id: number): TabsProps["items"] {
    return [
        {
            key: "Proof",
            label: "Proof",
            children: <ProofDetail id={id} />,
        },
        {
            key: "Challenge",
            label: "Challenge",
            children: <ChallengeDetail id={id} />,
        },
        {
            key: "Dispute",
            label: "Dispute",
            children: <DisputeDetail id={id} />,
        },
    ]
}
export default () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <Tabs
            defaultActiveKey="Proof"
            items={getItems(Number(id))}
            onChange={onChange}
        />
    )
}
