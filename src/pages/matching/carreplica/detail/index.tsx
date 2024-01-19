import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ValueFields } from "@unipackage/utils"
import { CarReplicaDescription } from "@/components/description/carReplica"
import { CarReplica } from "@dataswapjs/dataswapjs"
import { getCarReplica } from "../../../../messagehub/get"
import { useSelector } from "react-redux"

export default () => {
    const router = useRouter()
    const { carId, matchingId } = router.query
    const [carReplica, setCarReplica] = useState<ValueFields<CarReplica>>()
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )

    useEffect(() => {
        if (matchingId) {
            getCarReplica({
                network,
                queryFilter: {
                    and: [
                        { conditions: [{ carId }] },
                        { conditions: [{ matchingId }] },
                    ],
                },
            }).then((res) => {
                const result = res.data
                setCarReplica(result![0])
            })
        }
    }, [matchingId])

    return <>{carReplica && <CarReplicaDescription data={carReplica} />}</>
}
