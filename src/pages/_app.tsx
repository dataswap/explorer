import type { AppProps } from "next/app"
import Layout from "@/components/layout"

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
