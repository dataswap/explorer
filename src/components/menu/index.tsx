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
    MessageOutlined,
} from "@ant-design/icons"
import {
    config_dataset,
    config_home,
    config_matching,
    config_members,
    config_message,
    config_storage,
} from "../../config/links"

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
    getItem("Home", `/${config_home}`, <HomeOutlined />),
    getItem("Message", `/${config_message}`, <MessageOutlined />),
    getItem("Dataset", `/${config_dataset}`, <AuditOutlined />),
    getItem("Matching", `/${config_matching}`, <SwapOutlined />),
    getItem("Storage", `/${config_storage}`, <CloudServerOutlined />),
    getItem("Community members", `/${config_members}`, <GlobalOutlined />),
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
            if (currentPath.startsWith(`/${config_matching}`)) {
                setCurrent(`/${config_matching}`)
            } else if (currentPath.startsWith(`/${config_dataset}`)) {
                setCurrent(`/${config_dataset}`)
            } else if (currentPath.startsWith(`/${config_message}`)) {
                setCurrent(`/${config_message}`)
            } else if (currentPath.startsWith(`/${config_home}`)) {
                setCurrent(`/${config_home}`)
            } else if (currentPath.startsWith(`/${config_storage}`)) {
                setCurrent(`/${config_storage}`)
            } else if (currentPath.startsWith(`/${config_members}`)) {
                setCurrent(`/${config_members}`)
            } else {
                setCurrent(currentPath)
            }
        }

        handleRouteChange(window.location.pathname)

        router.events.on("routeChangeComplete", handleRouteChange)

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
