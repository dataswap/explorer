import { getVersion, getSyncStatus, SyncStatus } from "@/messagehub/get"
import { SyncStatusDescription } from "@/components/description/syncstatus"
import { StringDescription } from "@/components/description/string"
import Package from "../../../package.json"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default () => {
    const [msghubVersion, setMsghubVersion] = useState<string>()
    const [calibrationSyncStatus, setCalibrationSyncStatus] =
        useState<SyncStatus>({} as SyncStatus)
    const [mainSyncStatus, setMainSyncStatus] = useState<SyncStatus>(
        {} as SyncStatus
    )
    const network = useSelector(
        (state: { network: { network: string } }) => state.network.network
    )

    useEffect(() => {
        getVersion().then((res) => {
            setMsghubVersion(res)
        })
        getSyncStatus({ network: "calibration" }).then((res) => {
            res.data && setCalibrationSyncStatus(res.data)
        })
        getSyncStatus({ network: "main" }).then((res) => {
            res.data && setMainSyncStatus(res.data)
        })
    }, [])
    return (
        <>
            <StringDescription
                title="Explorer version"
                label="Version"
                data={Package.version ? Package.version : ""}
            />
            <StringDescription
                title="Dataswapjs version"
                label="Version"
                data={
                    Package.dependencies["@dataswapjs/dataswapjs"]
                        ? Package.dependencies["@dataswapjs/dataswapjs"]
                        : ""
                }
            />
            <StringDescription
                title="MessageHub version"
                label="Version:"
                data={msghubVersion ? msghubVersion : ""}
            />
            <StringDescription
                title="Network"
                label="network:"
                data={network ? network : ""}
            />
            <SyncStatusDescription
                title="Calibration network messageHub sync status"
                data={calibrationSyncStatus}
            />
            <SyncStatusDescription
                title="Main network messageHub sync status"
                data={mainSyncStatus}
            />
        </>
    )
}
