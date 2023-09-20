import React, { useState } from "react"
import type { MenuProps } from "antd"
import { Menu } from "antd"

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

interface IProps {
    param: MenuItem[]
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ param }: IProps) => {
    const [current, setCurrent] = useState("Dataset")

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e)
        setCurrent(e.key)
    }

    return (
        <Menu
            theme="dark"
            disabledOverflow
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={param}
        />
    )
}
