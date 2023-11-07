import { userApi } from "@/app/api/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from "../store";

const SLICE_NAME = "user";
type Store = typeof store;
type RootState = ReturnType<Store["getState"]>;
type AppDispatch = Store["dispatch"];

type ThunkApiConfig = {
  email: string;
};
export const getUser = createAsyncThunk(
  `${SLICE_NAME}/user`,
  async (payload: ThunkApiConfig) => {
    console.log("🚀 ~ file: userSlice.ts:16 ~ payload:", payload.email);
    try {
      const userData = await userApi.getUser(payload.email);
      console.log("🚀 ~ file: userSlice.ts:18 ~ userData:", userData);
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: {
  user: IUser;
  isLoading: boolean;
  error: any;
} = {
  user: {
    email: "",
    displayName: "",
    role: "",
    id: 0,
  },
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log(
        "🚀 ~ file: userSlice.ts:39 ~ builder.addCase ~ action:",
        action.payload
      );
      state.isLoading = false;
      state.user = action.payload?.data.data.user;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

const { reducer: userReducer } = userSlice;

export default userReducer;
