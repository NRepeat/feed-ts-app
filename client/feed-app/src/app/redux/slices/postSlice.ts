import { postApi } from "@/app/api/postApi";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const SLICE_NAME = "post";

export const getAllPosts = createAsyncThunk(
  `${SLICE_NAME}/allposts`,
  async (payload) => {
    try {
      const postsData = await postApi.getAllPosts();
      return postsData;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: {
  posts: Post[];
  isLoading: boolean;
  error: any;
} = {
  posts: [],
  isLoading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setPosts: (state, payload: PayloadAction<Post[]>) => {
      state.posts = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload?.data.data;
    });

    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const { setPosts } = postsSlice.actions;
const { reducer: postsReduser } = postsSlice;

export default postsReduser;
