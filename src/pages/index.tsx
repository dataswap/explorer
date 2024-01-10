import { useEffect } from "react"
import { useRouter } from "next/router"
import { config_message } from "../config/links"

const Index = () => {
    const router = useRouter()
    useEffect(() => {
        router.push(`/${config_message}`)
    }, [])
}

export default Index
