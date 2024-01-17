import type { AppProps } from "next/app"
import Layout from "@/components/layout"
import { Provider } from "react-redux"
import store from "../redux/store"

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}
