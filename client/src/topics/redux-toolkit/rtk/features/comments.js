import { createSlice } from "@reduxjs/toolkit";
import { fetchEntities } from "./entities";

const initialState = [
  {
    user: "elon",
    tweet: "It's super cool",
    likes: [
      {
        likeId: 233,
        user: "Jhon",
      },
    ],
  },
];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.push(action.payload);
    },
    addLikes: (state, action) => {
      state.forEach((comment) => {
        if (comment.user === payload.user) {
          comment.likes.push(action.payload.likeUser);
        }
      });
    },
  },
  // extraReducers: {
  //   ["entities/fetchData/fulfilled"]: (state, action) => {
  //     state.push(action.payload);
  //   },
  // },
  // extraReducers: {
  //   [fetchEntities.fulfilled]: (state, action) => {
  //     state.push(action.payload);
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchEntities.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
