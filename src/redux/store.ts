// store.ts
import { configureStore } from "@reduxjs/toolkit"
import { networkReducer } from "./slices/networkSlice"

const store = configureStore({
    reducer: {
        network: networkReducer,
    },
})

export default store
