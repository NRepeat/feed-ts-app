import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/userSlice";
import postsReduser from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    user:userReduser,
    posts:postsReduser
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
