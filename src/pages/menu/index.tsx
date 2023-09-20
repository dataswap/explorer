import Menu, { getItem, MenuItem } from "@/components/menu"
import {
    HomeOutlined,
    CloudServerOutlined,
    AuditOutlined,
    SwapOutlined,
    GlobalOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"

const items: MenuItem[] = [
    getItem("Home", "Home", <HomeOutlined />),
    getItem("Dataset", "Dataset", <AuditOutlined />),

    getItem("Matching", "Matching", <SwapOutlined />),

    getItem("Storage", "Storage", <CloudServerOutlined />),
    getItem("Community members", "Community members", <GlobalOutlined />),
]

const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e)
}

export default () => {
    return <>{<Menu param={items} />}</>
}
