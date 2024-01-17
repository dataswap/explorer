import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ValueFields } from "@unipackage/utils"
import { CarDescription } from "@/components/description/car"
import { Car } from "@dataswapjs/dataswapjs"
import { getCar } from "../../../../shared/messagehub/get"
import { useSelector } from "react-redux"

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [car, setCar] = useState<ValueFields<Car>>()
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )

    useEffect(() => {
        if (id) {
            getCar({
                network,
                queryFilter: { conditions: [{ carId: id }] },
            }).then((res) => {
                const result = res.data
                setCar(result![0])
            })
        }
    }, [id])

    return <>{car && <CarDescription data={car} />}</>
}
