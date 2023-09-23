import { useRouter } from "next/router"

export default () => {
    const router = useRouter()
    const { id, da } = router.query

    console.log(router.query)
    return (
        <>
            submit dispute for dataset:{id},da:{da}
        </>
    )
}
