import { rtiApi, ipGeolocationApi } from './api'
import { authSlice } from './auth'
import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './ui'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        [rtiApi.reducerPath]: rtiApi.reducer,
        [ipGeolocationApi.reducerPath]: ipGeolocationApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(rtiApi.middleware)
            .concat(ipGeolocationApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch