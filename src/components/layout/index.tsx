"use client"
import { Layout, theme } from "antd"
import Menu from "@/components/menu"
import { UserOutlined, GithubOutlined } from "@ant-design/icons"
import Package from "../../../package.json"

const { Header, Content, Footer } = Layout

export default ({ children }: any) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    return (
        <Layout className="layout">
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Menu />
                <div>
                    <span style={{ color: "white" }}>
                        Version: v{Package.version}
                    </span>
                    {/* <UserOutlined style={{ color: "white" }} /> */}
                </div>
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <div
                    className="site-layout-content"
                    style={{ background: colorBgContainer }}
                >
                    <main>{children}</main>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Dataswap ©2024 Created by Dataswap &nbsp;&nbsp;
                <a href="https://github.com/dataswap">
                    <GithubOutlined />
                </a>
            </Footer>
        </Layout>
    )
}
