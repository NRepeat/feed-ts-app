import { userApi } from "@/app/api/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SLICE_NAME = "user";

type ThunkApiConfig = {
  email: string;
};
export const getUser = createAsyncThunk(
  `${SLICE_NAME}/user`,
  async (payload: ThunkApiConfig) => {
    try {
      const userData = await userApi.getUser(payload.email);
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
      state.isLoading = false;
      state.user = action.payload!.data.data.user;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

const { reducer: userReducer } = userSlice;

export default userReducer;
