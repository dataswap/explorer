import { getVersion, getSyncStatus, SyncStatus } from "@/shared/messagehub/get"
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
            <div>Messagehub version: {msghubVersion}</div>
            <div>
                calibration network sync status:
                {JSON.stringify(calibrationSyncStatus)}
            </div>
            <div>
                main network sync status: {JSON.stringify(mainSyncStatus)}
            </div>
        </>
    )
}
