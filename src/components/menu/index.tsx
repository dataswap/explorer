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
    const [current, setCurrent] = useState("/home")

    const onClick: MenuProps["onClick"] = (e) => {
        router.push(e.key)
        setCurrent(e.key)
    }

    useEffect(() => {
        router.push(current)
    }, [current])

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
