"use client"
import { Breadcrumb, Layout, theme, Image } from "antd"
import Menu from "@/pages/menu"
import { UserOutlined, GithubOutlined } from "@ant-design/icons"

const { Header, Content, Footer } = Layout

const App: React.FC = () => {
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
                    <UserOutlined style={{ color: "white" }} />
                </div>
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <div
                    className="site-layout-content"
                    style={{ background: colorBgContainer }}
                >
                    Content
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Dataswap ©2023 Created by Dataswap &nbsp;&nbsp;
                <a href="https://github.com/dataswap">
                    <GithubOutlined />
                </a>
            </Footer>
        </Layout>
    )
}

export default App
