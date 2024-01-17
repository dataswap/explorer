import { getVersion, getSyncStatus, SyncStatus } from "@/shared/messagehub/get"
import { SyncStatusDescription } from "@/components/description/about/syncstatus"
import { VersionDescription } from "@/components/description/about/version"
import Package from "../../../package.json"
import React, { useEffect, useState } from "react"

export default () => {
    const [msghubVersion, setMsghubVersion] = useState<string>()
    const [calibrationSyncStatus, setCalibrationSyncStatus] =
        useState<SyncStatus>({} as SyncStatus)
    const [mainSyncStatus, setMainSyncStatus] = useState<SyncStatus>(
        {} as SyncStatus
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
            <VersionDescription
                title="Explorer version"
                data={Package.version ? Package.version : ""}
            />
            <VersionDescription
                title="MessageHub version"
                data={msghubVersion ? msghubVersion : ""}
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
