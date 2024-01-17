import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ValueFields } from "@unipackage/utils"
import { CarReplicaDescription } from "@/components/description/carReplica"
import { CarReplica } from "@dataswapjs/dataswapjs"
import { getCarReplica } from "../../../../shared/messagehub/get"

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [carReplica, setCarReplica] = useState<ValueFields<CarReplica>>()

    useEffect(() => {
        if (id) {
            getCarReplica({
                network: "calibration",
                queryFilter: { conditions: [{ carId: id }] },
            }).then((res) => {
                const result = res.data
                setCarReplica(result![0])
            })
        }
    }, [id])

    return <>{carReplica && <CarReplicaDescription data={carReplica} />}</>
}
