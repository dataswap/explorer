import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type FilecoinNetwork = "main" | "calibration"

interface NetworkState {
    network: FilecoinNetwork
}

const initialState: NetworkState = {
    network: "calibration",
}

const networkSlice = createSlice({
    name: "network",
    initialState,
    reducers: {
        setNetwork: (state, action: PayloadAction<FilecoinNetwork>) => {
            state.network = action.payload
        },
    },
})

export const { setNetwork } = networkSlice.actions
export const networkReducer = networkSlice.reducer
