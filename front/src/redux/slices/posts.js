import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (state) => {
    const { data } = await axios.get("/posts");

    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const deletePost = createAsyncThunk("posts/delete", async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: { items: [], status: "loading" },
  tags: { items: [], status: "loading" },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    sortByViews(state) {
      state.posts.items.sort((a, b) => {
        return new Date(b.viewCount) - new Date(a.viewCount);
      });
    },
    sortByCreateDate(state) {
      state.posts.items.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [deletePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== action.meta.arg
      );
      state.tags.status = "loading";
    },
  },
});
export const { sortByViews, sortByCreateDate } = postSlice.actions;
export const postsReducer = postSlice.reducer;
