import React, { useState, useEffect } from "react"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { useRouter } from "next/router"
import {
    HomeOutlined,
    CloudServerOutlined,
    AuditOutlined,
    SwapOutlined,
    GlobalOutlined,
} from "@ant-design/icons"

export type MenuItem = Required<MenuProps>["items"][number]

export function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem
}

const items: MenuItem[] = [
    getItem("Home", "/home", <HomeOutlined />),
    getItem("Dataset", "/dataset", <AuditOutlined />),

    getItem("Matching", "/matching", <SwapOutlined />),

    getItem("Storage", "/storage", <CloudServerOutlined />),
    getItem("Community members", "/members", <GlobalOutlined />),
]

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => {
    const router = useRouter()
    const [current, setCurrent] = useState(router.pathname)

    const onClick: MenuProps["onClick"] = (e) => {
        router.push(e.key)
        setCurrent(e.key)
    }

    useEffect(() => {
        const handleRouteChange = (url: any) => {
            const currentPath = url
            if (currentPath.startsWith("/matching")) {
                setCurrent("/matching")
            } else if (currentPath.startsWith("/dataset")) {
                setCurrent("/dataset")
            } else if (currentPath.startsWith("/home")) {
                setCurrent("/home")
            } else if (currentPath.startsWith("/storage")) {
                setCurrent("/storage")
            } else if (currentPath.startsWith("/members")) {
                setCurrent("/members")
            } else {
                setCurrent(currentPath)
            }
        }

        router.events.on("routeChangeComplete", handleRouteChange)
        setCurrent(router.pathname)

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [router])

    return (
        <Menu
            theme="dark"
            disabledOverflow
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}
