import { useRouter } from "next/router"

export default () => {
    const router = useRouter()
    const { id } = router.query

    return <>submit dispute for dataset{id}</>
}
