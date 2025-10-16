
import { baseApi } from './api/baseApi';
// import { reducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
  //   reducer,
  //   middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(baseApi.middleware),
  // })
import { reducer } from './rootReducer';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);