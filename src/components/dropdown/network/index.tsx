import React from "react"
import { DownOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Dropdown, message, Space } from "antd"

const onClick: MenuProps["onClick"] = ({ key }) => {
    message.info(`Click on item ${key}`)
}

const items: MenuProps["items"] = [
    {
        label: "MainNet",
        key: "MainNet",
    },
    {
        label: "CalibrationNet",
        key: "CalibrationNet",
    },
]

const App: React.FC = () => (
    <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                Network
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
)

export default App
