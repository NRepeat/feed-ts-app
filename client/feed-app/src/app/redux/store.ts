import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user:userReduser
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
