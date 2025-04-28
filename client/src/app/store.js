import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"
import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import themeReducer from "./theme/themeSlice"
import chatReducer from "./chat/chatSlice"
import singleMessageReducer from "./singleMessage/singleMessageSlice"

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
    chat: chatReducer,
    singleMessage: singleMessageReducer,
})

const persistConfig = {
    key: "root",
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({serializableCheck: false})
    ]
})

export const persistor = persistStore(store);