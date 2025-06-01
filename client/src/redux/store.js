import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/userSlice";
import listingSlice from "./listing/listingSlice";
import chatSlice from "./chat/chatSlice";
import addressSlice from "./address/addressSlice";

const userPersistConfig = {
  key: "auth",
  storage,
  version: 1,
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userSlice),
    listing: listingSlice,
    chat: chatSlice,
    locationsData: addressSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
