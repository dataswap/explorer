import React from "react"
import { DownOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Dropdown, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { setNetwork } from "../../../redux/slices/networkSlice"
import { useRouter } from "next/router"

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
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )
    const router = useRouter()

    const onClick: MenuProps["onClick"] = ({ key }) => {
        switch (key) {
            case "MainNet":
                dispatch(setNetwork("main"))
                router.push("/")
                break

            case "CalibrationNet":
                dispatch(setNetwork("calibration"))
                router.push("/")
                break
            default:
                break
        }
    }

    return (
        <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color: "white" }}>
                    Network:{network}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}

export default App
