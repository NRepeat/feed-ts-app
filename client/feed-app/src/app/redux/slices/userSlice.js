import { userApi } from "@/app/api/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SLICE_NAME = "user";

export const getUser = createAsyncThunk(`${SLICE_NAME}/user`,
  async (thunkApi) => {
    try {
      const userData = await userApi.getUser()
      return superheroData
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  })



const { reducer: superheroReducer } = superheroSlice;

export default superheroReducer;
