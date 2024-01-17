import React from "react"
import { DownOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Dropdown, Space } from "antd"
import { useDispatch } from "react-redux"
import { setNetwork } from "../../../redux/slices/networkSlice"

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

const App: React.FC = () => {
    const dispatch = useDispatch()

    const onClick: MenuProps["onClick"] = ({ key }) => {
        switch (key) {
            case "MainNet":
                dispatch(setNetwork("main"))
                break

            case "CalibrationNet":
                dispatch(setNetwork("calibration"))
                break
            default:
                break
        }
    }

    return (
        <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color: "white" }}>
                    Network
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}

export default App
