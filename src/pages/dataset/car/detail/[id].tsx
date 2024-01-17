import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ValueFields } from "@unipackage/utils"
import { CarDescription } from "@/components/description/car"
import { Car } from "@dataswapjs/dataswapjs"
import { getCar } from "../../../../shared/messagehub/get"

export default () => {
    const router = useRouter()
    const { id } = router.query
    const [car, setCar] = useState<ValueFields<Car>>()

    useEffect(() => {
        if (id) {
            getCar({
                network: "calibration",
                queryFilter: { conditions: [{ carId: id }] },
            }).then((res) => {
                const result = res.data
                setCar(result![0])
            })
        }
    }, [id])

    return <>{car && <CarDescription data={car} />}</>
}
