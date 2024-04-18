import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/authSlice.js"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const rootReducer = combineReducers({user: userReducer})

const persistConfig = {
    key : 'root',
    version: 1, 
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck: false})
    }

})

export const persistor = persistStore(store);


